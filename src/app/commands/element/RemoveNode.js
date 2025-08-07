import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import {CgCodeSlash} from "react-icons/cg";
import run from './RemoveNode.run'
import {COMMANDS} from "../../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../../const/scheme";

const scheme = {
  type: COMMANDS.REMOVE_NODE,
  from: "",
}

const Control = ({name}) => {
  const {jsx} = useSaveResultTo({name: `${name}from`, text:""})

  return (
    <>
      Remove element
      {jsx}
    </>
  )
}


export const RemoveNodeCommand = {
  icon:  <IconCommand Svg={CgCodeSlash} className={ICON_COLOR.RED}/>,
  Control,
  run,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  scheme,
  label: "Remove Element"
}



