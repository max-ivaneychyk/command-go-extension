import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import {useSaveResultTo} from "../hooks/useSaveResultTo";
import {useFormContext} from "react-hook-form";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../components/IconCommand";
import { HiOutlineVariable } from "react-icons/hi2";
import run, {formats} from "./Variable.run";
import {COMMANDS} from "../const/commands";
import CommandInfo from "../components/CommandInfo";

const scheme = {
  type: COMMANDS.INIT_VARIABLE,
  format: "number",
  value: 40,
  saveTo: ''
}

const Control = ({name}) => {
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text: ""})
  const {watch} = useFormContext();
  const format = watch(`${name}format`)

  return (
    <>
      <CommandInfo>
        Create a variable and assign a value <br/>
        -- <span className={'badge badge-grey'}>Name:</span> variable name to reference later as <span className={'badge badge-blue'}>{'{{'}varName{'}}'}</span> <br/>
        -- <span className={'badge badge-grey'}>Value:</span> initial value <br/>
        -- <span className={'badge badge-grey'}>Type:</span> number, string, boolean, array, or object
      </CommandInfo>
      {saveToJsx} is <Input
        type={format}
        placeholder={'40,4,4.6'}
        name={`${name}value`}
      />
      as
      <Dropdown
        options={formats}
        label={''}
        name={`${name}format`}
      />
    </>
  )
}


export const InitVariableCommand = {
  icon:  <IconCommand Svg={HiOutlineVariable} className={ICON_COLOR.GREEN}/>,
  Control,
  run,
  scheme,
  label: "Set variable",
  group: "Logic"
}

