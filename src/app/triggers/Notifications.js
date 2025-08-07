import React from 'react'
import {TRIGGERS} from "../const/triggers";
import Dropdown from "../components/Dropdown";
import {SCENARIO_EXECUTION_MODE} from "../const/scheme";

const actions = [
  // {id: TRIGGERS.NOTIFICATION_CLICKED, name: "On Notification Clicked"},
  {id: TRIGGERS.NOTIFICATION_CLOSED, name: "On Notification Closed"},
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

export const BrowserPushNotificationsTriggers = actions.map(({id}, index) => ({
  Control,
  scheme: {
    type: id,
    label: "Push Notification",
  },
  hidden: !!index,
  mode: SCENARIO_EXECUTION_MODE.BG,
  label: "Notification",
}));

