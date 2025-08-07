import {useSaveResultTo} from "../hooks/useSaveResultTo";
import {useFieldArray, useFormContext} from "react-hook-form";
import Dropdown from "../components/Dropdown";
import Command from "../components/Command";
import IconClose from "../components/IconClose";
import {useVariablesDropDown} from "../hooks/useVariablesDropDown";
import {useCollapse} from "../hooks/useCollapse";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../components/IconCommand";
import {getInitialScheme, inputOption, SelectFrom} from "../hooks/useSelectFrom";
import NestedView from "../components/NestedView";
import {IoMdAdd} from "react-icons/io";
import {TEXT} from "../const/messages";
import {useIncreaseHistoryVersion} from "../hooks/useIncreseHistoryVersion";
import {formats} from "./Mapper.run";
import run from "./Mapper.run";
import {COMMANDS} from "../const/commands";
import Optional from "../components/Optional";


const scheme = {
  type: COMMANDS.MAPPER,
  format: "single",
  from: '', // var
  saveTo: '', // var
  fields: [
    {
      from: getInitialScheme({as: inputOption.id}),
      to: getInitialScheme({as: inputOption.id})
    },
  ]
}

export const ListStructure = ({
                                name,
                                left,
                                right,
                                from = 'from',
                                to = "to",
                                placeholder = 'result.items',
                                CustomNext
                              }) => {
  const methods = useFormContext();
  const {control} = methods;
  const updateVersion = useIncreaseHistoryVersion();

  const {fields, append, remove} = useFieldArray({
    control,
    name
  });

  return (
    <>
      <NestedView className={'px-3'}>
        {
          fields.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={'mb-2'}
                >
                  <Optional name={`${name}.${index}.`}>
                  <Command className={'w-full'}>
                    {left?.title ?? "Key"}
                    <SelectFrom
                      placeholder={placeholder}
                      {...left?.props ?? {}}
                      group={`${name}.${index}.${from}`}
                    />
                    {right?.title ?? " Value"}
                    <SelectFrom
                      placeholder={placeholder}
                      {...right?.props ?? {}}
                      group={`${name}.${index}.${to}`}
                    />
                    {CustomNext && <CustomNext name={`${name}.${index}.`}/>}
                    <IconClose onClick={() => {
                      remove(index);
                      updateVersion();
                    }}
                    />
                  </Command>
                  </Optional>
                </div>
              )
            }
          )}

        <button
          type={'button'}
          onClick={() => {
            append({
              [from]: (left?.getInitial ?? getInitialScheme)(),
              [to]: (right?.getInitial ?? getInitialScheme)(),
            });
            updateVersion();
          }}
          className="inline-flex mr-2 items-center rounded-md badge-blue px-2 py-1 text-xs text-green-700 ring-1 ring-inset ring-green-700/10">
          <IoMdAdd className={'inline'}/> Add
        </button>
      </NestedView>
    </>
  )
}

export function Fields({prefixName = '', single}) {
  const collapse = useCollapse()

  if (single) return (
    <SelectFrom
      placeholder={'result.data'}
      group={`${prefixName}fields.0.to`}
    />
  );

  return (
    <>
      {collapse.control}
      {collapse.render(
        <ListStructure name={`${prefixName}fields`}/>)
      }
    </>
  )
}


const Control = ({name}) => {
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text: ""})
  const {watch} = useFormContext();
  const single = watch(`${name}format`) === 'single';
  const {jsx: dropDownJsx} = useVariablesDropDown({
    label: "",
    name: `${name}from`
  });

  return (
    <>
      Get
      <Dropdown
        options={formats}
        label={''}
        name={`${name}format`}
      />
      from {dropDownJsx}
      {
        single ? <>
          <Fields prefixName={name} single={single}/>
          {TEXT.ASSIGN_TO}{saveToJsx}
        </> : <>
          {TEXT.ASSIGN_TO}{saveToJsx}
          <Fields prefixName={name} single={single}/>
        </>
      }
    </>
  )
}


export const MapperCommand = {
  icon: <IconCommand Svg={".prop"} className={ICON_COLOR.BLUE}/>,
  Control,
  run,
  group: "Mapper",
  scheme,
}

