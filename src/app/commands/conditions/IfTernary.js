import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import Conditions, {getInitialModel} from "../../components/Condition";
import {getInitialScheme, SelectFrom} from "../../hooks/useSelectFrom";
import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import {TEXT} from "../../const/messages";
import { BiQuestionMark } from "react-icons/bi";
import run from "./IfTernary.run"
import {COMMANDS} from "../../const/commands";
import Syntax from "../../components/Syntax";

const scheme = {
  type: COMMANDS.IF_TERNARY,
  conditions: [
    {...getInitialModel()}
  ],
  then_value: getInitialScheme(),
  else_value: getInitialScheme(),
  saveTo: "",
}

const IfItem = ({name}) => {
  return (
    <Conditions prefixName={name}/>
  )
}

const Control = ({name}) => {
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text: ""})

  return (
    <>
      <IfItem name={`${name}.`}/> <Syntax>Then</Syntax>  <SelectFrom group={`${name}.then_value`}/> <Syntax>Else</Syntax> <SelectFrom group={`${name}.else_value`}/>  {TEXT.ASSIGN_TO}{saveToJsx}
    </>
  )
}


export const IFTernaryCommand = {
  icon: <IconCommand Svg={BiQuestionMark} className={ICON_COLOR.GREY}/>,
  label: "Ternary operator",
  Control,
  run,
  scheme,
}

