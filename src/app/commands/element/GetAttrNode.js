import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./GetAttrNode.run";
import {getInitialScheme, inputOption, useSelectFrom} from "../../hooks/useSelectFrom";
import {TEXT} from "../../const/messages";
import {MdOutlineLabel} from "react-icons/md";
import {COMMANDS} from "../../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../../const/scheme";

const scheme = {
  type: COMMANDS.GET_ATTRIBUTE_NODE,
  node: "",
  attr: getInitialScheme({
    as: inputOption.id,
    value: "id"
  }),
  saveTo: "" // or variable
}

const Control = ({name}) => {
  const {jsx} = useSaveResultTo({name: `${name}node`, text:""})
  const {jsx: jsxAttrValue} = useSaveResultTo({name: `${name}saveTo`, text:""});
  const {jsx: attr} = useSelectFrom({
    group: `${name}attr`,
  })

  return (
    <>
      Get element {jsx} attribute {attr}  {TEXT.ASSIGN_TO}{jsxAttrValue}
    </>
  )
}


export const GetAttrNodeCommand = {
  icon:   <IconCommand Svg={MdOutlineLabel} className={ICON_COLOR.BLUE} />,
  Control,
  run,
  scheme,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  label: "Get Attribute Element"
}



