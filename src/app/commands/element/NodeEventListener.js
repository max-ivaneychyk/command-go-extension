import React from 'react';
import {SCENARIO_EXECUTION_MODE, SCHEME_KEYS} from "../../const/scheme";
import {Commands} from "../../containers/Commands";
import {useCollapse} from "../../hooks/useCollapse";
import {useVariablesDropDown} from "../../hooks/useVariablesDropDown";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./NodeEventListener.run";
import {dropdownOption, getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import NestedView from "../../components/NestedView";
import { HiCursorClick } from "react-icons/hi";
import {COMMANDS} from "../../const/commands";

const scheme = {
  type: COMMANDS.NODE_EVENT,
  elem: "",
  event: getInitialScheme({
    as: dropdownOption.id,
    value: "click"
  }),
  eventData: '',
  commands: [],
  [SCHEME_KEYS.SCOPED]: true
}

const Control = ({name}) => {
  const collapse = useCollapse()
  const {jsx: dropDownJsx} = useVariablesDropDown({
    label: "",
    name: `${name}elem`
  });
  const {jsx: eventDataJsx} = useVariablesDropDown({
    label: "",
    name: `${name}eventData`
  });

  const {jsx: selectFromJsx} = useSelectFrom({
    group: `${name}event`,
    options: [
      {name: "click", id: 'click'},
      {name: "focus", id: 'focus'},
    ]
  })

  return (
    <>
      {collapse.control}
      Attach
      to element
      {dropDownJsx}
      event {selectFromJsx} listener ({eventDataJsx}: Event)
      {collapse.render(
        <NestedView>
          <Commands prefixName={name} nested/>
        </NestedView>
      )}
    </>
  )
}


export const NodeListenerCommand = {
  icon: <IconCommand Svg={HiCursorClick} className={ICON_COLOR.BLUE}/>,
  group: "HTML Events",
  label: "Attach Event Listener To Element",
  Control,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  run,
  scheme,
}



