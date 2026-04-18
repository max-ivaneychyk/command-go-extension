import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import { MdOutlinePostAdd } from "react-icons/md";
import run from './AppendNode.run'
import {COMMANDS} from "../../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../../const/scheme";

const scheme = {
  type: COMMANDS.APPEND_NODE,
  from: "",
  to: "$BODY",
}

const Control = ({name}) => {
  const {jsx} = useSaveResultTo({name: `${name}from`, text:""})
  const {jsx: to} = useSaveResultTo({name: `${name}to`, text:""})

  return (
    <>
      Append element
      {jsx} to {to}
    </>
  )
}


export const AppendNodeCommand = {
  icon:  <IconCommand Svg={MdOutlinePostAdd} className={ICON_COLOR.BLUE}/>,
  label: "Append Element",
  Control,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  run,
  scheme,
}



