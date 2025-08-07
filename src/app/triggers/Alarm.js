import React from 'react'
import Input from "../components/Input";
import {TRIGGERS} from "../const/triggers";
import hooks from './Alarm.hooks'
import {SCENARIO_EXECUTION_MODE} from "../const/scheme";

const scheme = {
  type: TRIGGERS.ALARM,
  label: "Schedule",
  delayInMinutes: 1,
  periodInMinutes: 1
}

const Control = ({name}) => {
  return (
    <>
      Schedule:
      delay In
      <Input
        name={`${name}delayInMinutes`}
        placeholder={"1"}
        type={'number'}
        className={'ml-2 badge badge-grey cursor-pointer'}
      />
      Minutes and
      period In
      <Input
        name={`${name}periodInMinutes`}
        placeholder={"1"}
        type={'number'}
        className={'ml-2 badge badge-grey cursor-pointer'}
      /> Minutes
    </>
  )
}

export const AlarmTrigger = {
  Control,
  scheme,
  hooks,
  mode: SCENARIO_EXECUTION_MODE.BG,
  label: "By Schedule",
}

