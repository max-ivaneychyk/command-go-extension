import {useVariablesDropDown} from "./useVariablesDropDown";
import {useFormContext} from "react-hook-form";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import React, {useMemo} from "react";
import { HiVariable } from "react-icons/hi2";
import { RxInput } from "react-icons/rx";
import { IoIosList } from "react-icons/io";
import { BiSolidComponent } from "react-icons/bi";
import {SOURCE_TYPES} from "../const/variables";

export const inputOption = {name: "(Input)", id: SOURCE_TYPES.INPUT, view: <RxInput/>};
export const variableOption = {name: "(Variable)", id: SOURCE_TYPES.VARIABLE, view: <HiVariable/>};
export const boolOption = {name: "(Boolean)", id: SOURCE_TYPES.BOOLEAN, view: "Bool"};
export const numberOption = {name: "(Number)", id: SOURCE_TYPES.NUMBER, view: "int"};
export const dropdownOption = {name: "(Dropdown)", id: SOURCE_TYPES.DROPDOWN, view: <IoIosList/>};
export const componentOption = {name: "(Component)", id: SOURCE_TYPES.COMPONENT, view: <BiSolidComponent/>};

const types = [
  inputOption,
  variableOption
];

export const getInitialScheme = ({value = '', as = inputOption.id} = {}) => {
  return {
    as,
    value
  }
}

export const useSelectFrom = ({label = '', onClear,  inputType, components, group, options, placeholder = 'value'}) => {
  const from = group.concat(".as");
  const name = group.concat(".value");

  const {jsx: dropDownJsx} = useVariablesDropDown({
    label: "",
    name: name,
    onClear
  });

  const {watch, setValue} = useFormContext()
  const value = watch(from); // you can supply default value as second argument

  const $components  = useMemo(() => {
    if(components)return components;
    return options?.length ? [...types, dropdownOption] : types;
  }, [components, options?.length])

  const jsx = <>
    {
      !($components.length === 1 && value === $components[0].id)
      && <Dropdown
        buttonClass={'!text-gray-600 !mr-0 dark:!text-[#0179ff]'}
        options={$components}
        label={label}
        name={from}
        onSetValue={() => {
          setValue(name, "")
        }}
      />
    }

    {
      value === inputOption.id &&
      <Input
        type={inputType}
        name={name}
        placeholder={placeholder}
      />
    }

    {
      value === numberOption.id &&
      <Input
        type={'number'}
        name={name}
        placeholder={placeholder}
      />
    }

    {
      value === variableOption.id &&
      dropDownJsx
    }
    {
      value === boolOption.id &&
      <Dropdown
        options={[
          {id: false, name: "False"},
          {id: true, name: "True"},
        ]}
        label={label}
        name={name}
      />
    }
    {
      value === dropdownOption.id && options?.length &&
      <Dropdown
        options={options}
        label={label}
        name={name}
      />
    }
  </>

  return {
    mode: value,
    jsx,
  }
}

export const SelectFrom = ({label, group, options, placeholder, components}) => {
  const {jsx} = useSelectFrom({
    label, group, options, placeholder, components
  })

  return jsx;
}
