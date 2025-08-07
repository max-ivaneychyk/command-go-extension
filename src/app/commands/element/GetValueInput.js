import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./GetValueInput.run";
import {TEXT} from "../../const/messages";
import { RxInput } from "react-icons/rx";
import {COMMANDS} from "../../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../../const/scheme";

const scheme = {
  type: COMMANDS.GET_VALUE_OF_INPUT,
  node: "",
  saveTo: "" // or variable
}

const Control = ({name}) => {
  const {jsx} = useSaveResultTo({name: `${name}node`, text:""})
  const {jsx: jsxAttrValue} = useSaveResultTo({name: `${name}saveTo`, text:""});

  return (
    <>
      Get input {jsx} value  {TEXT.ASSIGN_TO}{jsxAttrValue}
    </>
  )
}


export const GetValueNodeCommand = {
  icon:   <IconCommand Svg={RxInput} className={ICON_COLOR.BLUE} />,
  label: "Get Value Of Input",
  group: 'Input Elements',
  Control,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  run,
  scheme,
}



