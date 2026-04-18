import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import {getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import IconCommand from "../../components/IconCommand";
import run from "./SetAttrNode.run";
import {CgCodeSlash} from "react-icons/cg";
import {COMMANDS} from "../../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../../const/scheme";

const scheme = {
  type: COMMANDS.SET_ATTRIBUTE_NODE,
  node: "",
  attr: getInitialScheme(),
  value: getInitialScheme()
}


const Control = ({name}) => {
  const {jsx} = useSaveResultTo({name: `${name}node`, text:""})
  const {jsx: selectFromJsx} = useSelectFrom({
    group: `${name}value`,
    placeholder: 'my-value'
  })
  const {jsx: attr} = useSelectFrom({
    group: `${name}attr`,
    placeholder: 'class'
  })

  return (
    <>
      Set element {jsx} attribute {attr} and value {selectFromJsx}
    </>
  )
}


export const SetAttrNodeCommand = {
  icon:  <IconCommand Svg={CgCodeSlash} />,
  Control,
  run,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  scheme,
  label: "Set Attribute Element"
}



