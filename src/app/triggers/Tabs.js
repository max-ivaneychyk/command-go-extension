import React from 'react'
import {TRIGGERS} from "../const/triggers";
import Dropdown from "../components/Dropdown";
import {SCENARIO_EXECUTION_MODE} from "../const/scheme";
import {TbBrowser} from "react-icons/tb";

const actions = [
  {id: TRIGGERS.TAB_CREATED, name: "On Tab Created"},
  // {id: TRIGGERS.TAB_MOVED, name: "On Tab Moved"},
  {id: TRIGGERS.TAB_UPDATED, name: "On Tab Updated"},
  {id: TRIGGERS.TAB_REMOVED, name: "On Tab Removed"},
]

const Control = ({name}) => {
  return (
    <>
      Browser Event:
      <Dropdown
        options={actions}
        label={''}
        name={`${name}type`}
      />
    </>
  )
}

export const BrowserTabTriggers = actions.map(({id}, index) => ({
  Control,
  scheme: {
    type: id,
    label: "Tab",
  },
  hidden: !!index,
  mode: SCENARIO_EXECUTION_MODE.BG,
  label: "Browser Tab",
  icon: TbBrowser,
}));

