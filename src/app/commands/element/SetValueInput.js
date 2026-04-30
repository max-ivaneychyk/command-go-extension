import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import {getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import run from "./SetValueInput.run";
import {RxInput} from "react-icons/rx";
import {COMMANDS} from "../../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../../const/scheme";

const scheme = {
  type: COMMANDS.SET_VALUE_TO_INPUT,
  node: "",
  value: getInitialScheme() // or variable
}

const Control = ({name}) => {
  const {jsx} = useSaveResultTo({name: `${name}node`, text:""})
  const {jsx: selectFromJsx} = useSelectFrom({
    group: `${name}value`,
    placeholder: 'text to set'
  })

  return (
    <>
      Set input/textarea {jsx} value {selectFromJsx}
    </>
  )
}


export const SetValueInputCommand = {
  icon:  <IconCommand Svg={RxInput} className={ICON_COLOR.YELLOW}/>,
  Control,
  run,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  scheme,
  label: "Set Input Value"
}



