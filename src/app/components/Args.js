import {useFieldArray, useFormContext} from "react-hook-form";
import React from 'react';
import {IoMdAdd} from "react-icons/io";
import {useIncreaseHistoryVersion} from "../hooks/useIncreseHistoryVersion";
import {useSelectFrom, variableOption} from "../hooks/useSelectFrom";
import {SOURCE_TYPES} from "../const/variables";

const _components = [variableOption];

const Arg = ({name, onRemove, isLast, annotation = null, components = _components}) => {
  const {jsx} = useSelectFrom({
    group: name,
    onClear: onRemove,
    components,
    label: "",
  })

  return (
    <>
      <div className={'relative inline command'}>
        {annotation && <span className={'opacity-70 italic capitalize'}>{annotation}: </span>}{jsx}
      </div>
      {!isLast && ", "}
    </>
  )
}

export function Args({prefixName = '', min = 0, max = Infinity, annotations = [], components}) {
  const methods = useFormContext();
  const {control} = methods;
  const name = prefixName + "arguments";
  const updateVersion = useIncreaseHistoryVersion();

  const {fields, append, remove} = useFieldArray({
    control,
    name
  });

  const allowRemove = min < fields.length;
  const allowAdd = max > fields.length;

  return (
    <div className={'pr-2 inline '}>
      ({
      fields.map((item, index) => {
        const isLast = fields.length === index+1;

        return (
            <Arg
              components={components}
              annotation={annotations[index]}
              key={item.id}
              name={`${prefixName}arguments.${index}`}
              isLast={isLast}
              onRemove={allowRemove ? () => {
                remove(index);
                updateVersion();
              } : undefined}>
            </Arg>
          )
        }
      )}
      {
        allowAdd &&
        <button
          type={'button'}
          onClick={() => {
            append({value: "", as: SOURCE_TYPES.VARIABLE});
            updateVersion();
          }}
          className=" badge badge-blue ml-0.5">
          <IoMdAdd className={'inline'}/>
        </button>
      }
      )
    </div>
  )
}
