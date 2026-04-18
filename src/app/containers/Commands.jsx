import {useFieldArray, useFormContext} from "react-hook-form";
import Command from "../components/Command";
import IconClose, {IconCopy, IconDrag} from "../components/IconClose";
import {ScopeCtx} from "../scope";
import React, {useContext, useMemo} from "react";
import ErrorNotice from "../components/ErrorNotice";
import {SCENARIO_EXECUTION_MODE, SCHEME_AS, SCHEME_KEYS} from "../const/scheme";
import Placeholder from "../components/Placeholder";
import SelectCommands from "../components/SelectCommand";
import {useAddCommand} from "../hooks/useAddCommand";
import AnimateHeight from "react-animate-height";
import {COLLAPSE} from "../hooks/useCollapse";
import {Button} from "rsuite";
import {useFullScreen} from "../hooks/useFullScreen";
import {useIncreaseHistoryVersion} from "../hooks/useIncreseHistoryVersion";
import {CommandIdCtx} from "../ctx/commandID";
import {controlsMap} from "../map.controls";
import {useOptional} from "../components/Optional";
import {ReactSortable} from "react-sortablejs";
import CatchError from "../components/CatchError";
import Tooltip from "../components/Tooltip";
import {PermissionsCtx} from "../ctx/permissions";
import {COMMAND_SUGGESTIONS} from "../const/commandSuggestions";

const getListStyle = () => ({
  marginBottom: "8px"
});

const getItemStyle = () => ({
  padding: `8px 8px 8px 16px`,
});

function getParentCommandScopeByPath(pathString, getValues) {
  const path = pathString.split(".");

  if (pathString === 'commands') return "$$global"

  for (let i = 0; i < path.length; i++) {
    const newPath = path.slice(0, path.length - i);
    const id = getValues(newPath.join("."))?.$id;

    if (id) {
      return '$$scope:' + id;
    }
  }

  return "$$global"
}

function normalizeAddresses(from, to) {
  // Case: 1
  // commands.12 => deleted
  // commands.13.commands.0 => commands.12.commands.0

  // Case: 2
  // commands.0.commands.0
  // commands.2.commands.1

  // Case: 3
  // commands.0.commands.1
  // commands.0.commands.2.ifs.0.commands.0

  // console.log("INPUT", from, to);

  const fromList = from.split(".");
  const toList = to.split(".");
  const minLength = Math.min(toList.length, fromList.length);

  for (let i = 0; i < minLength; i++) {
    const isEdge = [toList.length, fromList.length].includes(i + 1);

    if (!isEdge) continue;

    // @deprecated check {minLength} cover this too
    if (!toList[i] || !fromList[i]) break;

    if (toList[i] === fromList[i] || !Number.isInteger(fromList[i] * 1)) continue;

    const isPrevPathSame = fromList.slice(0, i).join(".") === toList.slice(0, i).join(".");

    if (!isPrevPathSame) break;

    const fromInt = parseInt(fromList[i], 10);
    const toInt = parseInt(toList[i], 10);

    // "commands.12",
    // "commands.13.commands.0"
    if (fromInt < toInt) {
      toList[i] = toInt - 1;
      break;
    }

    // "commands.13.commands.0"
    // "commands.12",
    fromList[i] = fromInt + 1;
    break;
  }

  fromList.pop()
  toList.pop()

  const out = {
    from: fromList.join('.'),
    to: toList.join('.'),
  }

  // console.log("OUT", out.from, out.to);

  return out
}

function moveItemToCollection(source, target, itemIndex, targetIndex) {
  if (itemIndex < 0 || itemIndex >= source.length) return;

  const [item] = source.splice(itemIndex, 1);
  target.splice(targetIndex, 0, {...item});
}

const CommandSection = ({className, dragHandler, $id, icon, name, Control, onRemove, onCopy, permission}) => {
  const {control, render, isPortal} = useFullScreen();
  const {actions: {request}, permissions} = useContext(PermissionsCtx)
  const {jsx, className: cls, onToggle} = useOptional({name, as: 'div', enableHandler: false});
  const allowed = !permission || !!permissions[permission];

  return render(
    <CommandIdCtx.Provider value={$id}>
      <Command
        className={[className, cls].join(' ')}
      >
        {control}
        {dragHandler}
        <Tooltip
          enterable
          delay={300}
          className={'!-ml-3'}
          placement={'right'}
          hint={
            <div
              className={'flex items-center origin-left scale-90 !-ml-1'}>
              <button className={'!inline-flex mr-1 !items-center badge badge-blue !px-2 cursor-pointer'}
                      onClick={onToggle}>{jsx}Toggle
              </button>
              <button className={'!inline-flex mr-1 !items-center badge badge-blue !px-2 cursor-pointer'}
                      onClick={onCopy}><IconCopy height={22} className={'mr-1 w-5 h-5'}/> Duplicate
              </button>
            </div>}
          closeOnClick={false}
          trigger={'hover'}>
          <div className={'inline cursor-pointer'}>{icon}</div>
        </Tooltip>

        {allowed ?
          <Control
            name={name} $id={$id}
            isPortal={isPortal}/> :
          <>
            This command require additional permission "{permission}"
            <button
              type={'button'}
              onClick={() => request(permission)}
              className={'badge badge-yellow ml-1'}>
              Allow
            </button>
          </>
        }
        <IconClose onClick={onRemove}/>
      </Command>
      <ErrorNotice $id={$id}/>
    </CommandIdCtx.Provider>
  )
}

function CommandSuggestions({fields, as, list, nested, onSelect}) {
  const lastCommandType = fields.length > 0 ? fields[fields.length - 1].type : null;

  const suggestions = useMemo(() => {
  //  if (!lastCommandType) return [];
    const ids = COMMAND_SUGGESTIONS[lastCommandType];
    if (!ids) return [];

    return ids
      .map(id => {
        const config = controlsMap.get(id);
        if (!config || config.hidden || config.as !== as) return null;
        return {id, name: config.label ?? id, icon: config.icon};
      })
      .filter(Boolean);
  }, [lastCommandType, as]);

  return (
    <div className={'pl-7 pb-1 mt-2.5'}>
      <div className={'flex justify-between'}>
        <SelectCommands
          as={as}
          options={list}
          onSelect={onSelect}
        />
        {
          !nested &&
          <Button
            type={'button'}
            onClick={() => {
              window.open('https://forms.gle/SZT1BhGPnQLBxrju5');
            }}
            className="badge-indigo badge ml-auto text-default leading-default">
            > Request a new feature
          </Button>
        }
      </div>
      {suggestions.length > 0 && (
        <div className={'flex flex-wrap gap-1.5 mt-2'}>
          {suggestions.map(({id, name, icon}) => (
            <button
              key={id}
              type={'button'}
              onClick={() => onSelect(id)}
              className={
                'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] ' +
                'border border-blue-200 dark:border-blue-800' +
                'bg-blue-50 dark:bg-blue-900/30 ' +
                'text-blue-700 dark:text-blue-300 ' +
                'hover:bg-blue-100 dark:hover:bg-blue-900/50 ' +
                'cursor-pointer transition-colors'
              }
            >
              <span className={'flex-shrink-0 [&>svg]:w-2 [&>svg]:h-2'}>{icon}</span>
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Commands({prefixName = '', nested, label, as = SCHEME_AS.COMMAND, open = true}) {
  const methods = useFormContext();
  const {control, watch, setValue, getValues} = methods;
  const name = prefixName + 'commands';
  const {fields, move, append, remove, insert} = useFieldArray({
    control,
    name
  });
  const updateVersion = useIncreaseHistoryVersion();
  const mode = watch('$$executionIn') ?? SCENARIO_EXECUTION_MODE.CONTENT;
  const {prepareOneCommand, getCopy} = useAddCommand();

  const hasCommands = useMemo(() =>
    fields.some(item => !!controlsMap.get(item.type)?.Control), [fields])

  const list = Array.from(controlsMap)
    .map(([type, value]) => {
      const {label, ...additional} = value
      return ({
        ...additional,
        id: type,
        name: label ?? type,
      })
    })
    .filter(item => !item.mode || item.mode === mode)

  return (
    <CatchError>
      <ul
        style={open ? getListStyle() : undefined}
      >
        {!!label && <div className={'ml-4'}>{label}</div>}
        <AnimateHeight
          duration={500}
          height={open ? COLLAPSE.OPEN : COLLAPSE.CLOSED}
        >
          <ReactSortable
            key={fields.length}
            list={fields.map(({$id, ...p}) => ({id: $id, $id, ...p}))}
            ghostClass={'ghost'}
            group={'nested'}
            animation={200}
            setList={() => {
            }}
            onChoose={() => {
              document.body.classList.add('isDragging');
            }}
            onEnd={({from, to, newIndex, oldIndex, item, type,}) => {
              // invalid indexes
              document.body.classList.remove('isDragging');

              if (!Number.isInteger(oldIndex) || !Number.isInteger(newIndex)) {
                return;
              }

              // Same container
              if (from === to) {
                move(
                  oldIndex,
                  newIndex
                );
                updateVersion();
                return;
              }

              const fromName = from.id;
              const toName = to.id;
              const scope = item.dataset.scope;
              const $$ref = getParentCommandScopeByPath(toName, getValues);
              const fromList = getValues(fromName);
              const toList = getValues(toName);

              moveItemToCollection(fromList, toList, oldIndex, newIndex);

              const {
                from: f,
                to: t
              } = normalizeAddresses(fromName.concat(`.${oldIndex}`), toName.concat(`.${newIndex}`));

              setValue(f, [...fromList]);
              setValue(t, [...toList])
              setValue(`$$scopes.${scope}.$$ref`, $$ref)
              setTimeout(updateVersion, 100);
            }}
            chosenClass="chosen"
            handle={'.dnd-handler'}
            id={name}
            data-path={name}
          >
            {fields.map((item, index) => {
              const config = controlsMap.get(item.type);
              const C = config?.Control;
              const permission = config?.permissions;
              const icon = config?.icon;
              const withScope = !!item[SCHEME_KEYS.SCOPED];
              const VirtualScope = withScope ? ScopeCtx.Provider : 'div';
              const scope = `$$scope:${item.$id}`;

              if (!C) {
                return null;
              }

              return (
                <div
                  data-scope={scope}
                  key={scope}
                  className={as === SCHEME_AS.COMMAND ? 'command__wrapper relative' : ""}
                  style={getItemStyle()}
                >
                  <VirtualScope value={scope}>
                    <CommandSection
                      $id={item.$id}
                      className={item.className}
                      name={`${prefixName}commands.${index}.`}
                      Control={C}
                      icon={icon}
                      onRemove={() => {
                        remove(index);
                        updateVersion()
                      }}
                      permission={permission}
                      onCopy={() => {
                        insert(index + 1, getCopy(item));
                        updateVersion()
                      }}
                      dragHandler={
                        <span className={`action dnd-handler cursor-grab`}
                        >
                          <IconDrag/>
                      </span>
                      }
                    />
                  </VirtualScope>
                </div>
              )
            })}
            {
              !hasCommands ?
                <div className={'mx-4'}>
                  <Placeholder>No any blocks yet</Placeholder>
                </div> :
                <div/>
            }
          </ReactSortable>
          <CommandSuggestions
            fields={fields}
            as={as}
            list={list}
            nested={nested}
            onSelect={(key) => {
              append(prepareOneCommand(key))
              updateVersion()
            }}
          />
        </AnimateHeight>
      </ul>
    </CatchError>
  );
}

