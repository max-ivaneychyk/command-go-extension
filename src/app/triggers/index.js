import {useFieldArray, useFormContext} from "react-hook-form";
import React from "react";
import Command from "../components/Command";
import IconClose from "../components/IconClose";
import {Select} from "../components/Dropdown";
import {nanoid} from "nanoid";
import {useCollapse} from "../hooks/useCollapse";
import {useIncreaseHistoryVersion} from "../hooks/useIncreseHistoryVersion";
import {triggersMap} from "../map.triggers";
import {SCENARIO_EXECUTION_MODE} from "../const/scheme";
import Tag from "../components/Tag";
import Hint from "../components/InfoHint";
import {TbBolt} from "react-icons/tb";


const TriggerIcon = ({icon: Icon}) => {
  if (!Icon) return null;
  return (
    <span className={'inline-flex items-center justify-center bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400 rounded-lg mr-2 p-1 min-w-[28px] h-7'}>
      <Icon className={'w-4 h-4'}/>
    </span>
  )
}

export const Triggers = () => {
  const methods = useFormContext();
  const {control, watch} = methods;
  const name = "triggers";
  const updateVersion = useIncreaseHistoryVersion();
  const mode = watch('$$executionIn') ?? SCENARIO_EXECUTION_MODE.CONTENT

  const list = Array.from(triggersMap)
    .map(([type, trigger]) => ({
        id: type,
        hidden: trigger.hidden,
        mode: trigger?.mode,
        name: trigger?.label ?? type
      })
    )
    .filter(item => !item.hidden)
    .filter(item => !item.mode || item.mode === mode)

  const {fields, append, remove} = useFieldArray({
    control,
    name,
  });

  const collapse = useCollapse({
    className: "!top-0",
    initial: 'auto'
  })

  return (
    <>
      <div className={'mx-4 flex items-center'}>
        <Tag>
          <TbBolt className={'inline w-3.5 h-3.5 mr-0.5'}/>
          Triggers{fields.length > 0 && ` (${fields.length})`}
          <Hint hint={'Triggers run your scenario automatically: when a page loads, on a schedule, or on browser events.'}> </Hint>
        </Tag>  {collapse.control}
      </div>

      <div className={'pb-2'}>
        {
          collapse.render(
            <div className={'mx-4 mb-2'}>
              {!fields.length && (
                <p className={'text-gray-400 dark:text-gray-500 text-xs py-2 pl-1'}>
                  No triggers yet. Add one to run this scenario automatically.
                </p>
              )}

              {fields.map((item, index) => {
                const trigger = triggersMap.get(item.type);
                if (!trigger) return null;
                const C = trigger.Control;

                return (
                  <Command key={item?.key ?? item.id} className={'my-2'}>
                    <TriggerIcon icon={trigger.icon}/>
                    <C name={`${name}.${index}.`}/>
                    <IconClose onClick={() => {
                      remove(index);
                      updateVersion();
                    }}/>
                  </Command>)
              })}

              <div className={'flex pt-1 pb-2 pl-1'}>
                <Select
                  defaultText={'+ Trigger'}
                  options={list}
                  setValue={key => {
                    append({...triggersMap.get(key).scheme, key: nanoid()});
                    updateVersion();
                  }}
                />
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}
