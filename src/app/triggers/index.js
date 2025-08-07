import {useFieldArray, useFormContext} from "react-hook-form";
import React from "react";
import Command from "../components/Command";
import IconClose from "../components/IconClose";
import {Select} from "../components/Dropdown";
import {nanoid} from "nanoid";
import {useCollapse} from "../hooks/useCollapse";
import Placeholder from "../components/Placeholder";
import {useIncreaseHistoryVersion} from "../hooks/useIncreseHistoryVersion";
import {triggersMap} from "../map.triggers";
import {SCENARIO_EXECUTION_MODE} from "../const/scheme";
import Tag from "../components/Tag";
import Hint from "../components/InfoHint";


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
        <Tag>Triggers: ({fields.length})
          <Hint hint={'A trigger in a Chrome extension is any event (like tab changes, or page loads) that activates an extension’s script to perform an action.'}> </Hint>
        </Tag>  {collapse.control}
      </div>

      <div className={'pb-2'}>
        {
          collapse.render(
            <div className={'mx-4 mb-2'}>
              {!fields.length && <div>
                <Placeholder>No triggers yet</Placeholder>
              </div>}

              {fields.map((item, index) => {
                const C = triggersMap.get(item.type).Control;

                return (
                  <Command key={item?.key ?? item.id} className={'my-2'}>
                    <C name={`${name}.${index}.`}/>
                    <IconClose onClick={() => {
                      remove(index);
                      updateVersion();
                    }
                    }/>
                  </Command>)
              })}

              <div className={'flex pt-1 pb-2 pl-4'}>
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
