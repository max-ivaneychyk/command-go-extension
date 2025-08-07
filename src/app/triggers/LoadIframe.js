import React from 'react'
import Input from "../components/Input";
import {LOAD_URL_CONDITION, TRIGGERS} from "../const/triggers";
import Dropdown from "../components/Dropdown";
import {useFieldArray, useFormContext} from "react-hook-form";
import {SCENARIO_EXECUTION_MODE} from "../const/scheme";

const conditions = [
  {id: LOAD_URL_CONDITION.START, name: "URL - start with"},
  {id: LOAD_URL_CONDITION.CONTAINS, name: "URL - contains "},
  {id: LOAD_URL_CONDITION.END, name: "URL - end with"},
]

const scheme = {
  type: TRIGGERS.IFRAME_LOAD_URL,
  label: "Site URL",
  conditions: [{type: LOAD_URL_CONDITION.START, value: "https://example.com"}],
}

const PartCondition = ({name, onRemove, isLast}) => {
  return (
    <>
      <div className={'relative inline command'}>
        <Dropdown
          options={conditions}
          label={''}
          name={`${name}type`}
          onClear={onRemove}
          allowClear
        />
        <Input name={`${name}value`} placeholder={"Type URL"} className={'ml-2 badge badge-grey cursor-pointer'}/>
      </div>
      {!isLast && " and "}
    </>
  )
}

function Conditions({prefixName = ''}) {
  const methods = useFormContext();
  const {control} = methods;
  const name = prefixName + "conditions";

  const {fields, append, remove} = useFieldArray({
    control,
    name
  });

  return (
    <div className={'pr-2 inline '}>
      {
        fields.map((item, index) => {
            return (
              <PartCondition
                key={item.id}
                name={`${prefixName}conditions.${index}.`}
                isLast={fields.length - 1 === index}
                onRemove={() => remove(index)}>
              </PartCondition>
            )
          }
        )}
      <button
        type={'button'}
        onClick={() => {
          append({type: LOAD_URL_CONDITION.START, value: "https://example.com"})
        }}
        className=" badge badge-blue ml-0.5">
        + and
      </button>
    </div>
  )
}


const Control = ({name}) => {
  return (
    <>
      Iframe <Conditions prefixName={`${name}`}/> loaded
    </>
  )
}

export const URLLoadIframeTrigger = {
  Control,
  scheme,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  label: "Load Iframe URL",
}

