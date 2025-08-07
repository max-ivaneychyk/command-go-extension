import {useVariablesDropDown} from "../hooks/useVariablesDropDown";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../components/IconCommand";
import { TbLogs } from "react-icons/tb";
import run from "./Log.run";
import {COMMANDS} from "../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../const/scheme";

const scheme = {
  type: COMMANDS.LOG,
  value: ``, // variableName
}

const Control = ({name}) => {
  const {jsx: dropDownJsx} = useVariablesDropDown({
    label: "",
    name: `${name}value`
  });

  return (
    <>
      Log variable{dropDownJsx} to console
    </>
  )
}


export const LogCommand = {
  icon: <IconCommand Svg={TbLogs} className={ICON_COLOR.GREY}/>,
  Control,
  run,
  scheme,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  group: "Debug",
  label: "Log variable"
}

