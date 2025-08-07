import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./NodeTrigger.run";
import {dropdownOption, getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import { GiClick } from "react-icons/gi";
import {COMMANDS} from "../../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../../const/scheme";

const scheme = {
  type: COMMANDS.NODE_TRIGGER,
  from: "",
  action: getInitialScheme({
    as: dropdownOption.id,
    value: "click"
  }),
}

const Control = ({name}) => {
  const {jsx} = useSaveResultTo({name: `${name}from`, text: ""});
  const {jsx: action} = useSelectFrom({
    components: [dropdownOption],
    options: [{name: "Click", id: 'click'}],
    group: `${name}action`,
  })

  return (
    <>
      Trigger event {action} on element {jsx}
    </>
  )
}


export const TriggerNodeCommand = {
  icon: <IconCommand Svg={GiClick} className={ICON_COLOR.YELLOW}/>,
  Control,
  run,
  scheme,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  label: "Trigger Click By Element"
}



