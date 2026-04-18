import React from 'react'
import Input from "../components/Input";
import {TRIGGERS} from "../const/triggers";
import hooks from './Alarm.hooks'
import {SCENARIO_EXECUTION_MODE} from "../const/scheme";
import {TbClock} from "react-icons/tb";

const scheme = {
  type: TRIGGERS.ALARM,
  label: "Schedule",
  delayInMinutes: 1,
  periodInMinutes: 1
}

const Control = ({name}) => {
  return (
    <>
      Run after
      <Input
        name={`${name}delayInMinutes`}
        placeholder={"1"}
        type={'number'}
        className={'ml-2 badge badge-grey cursor-pointer'}
      />
      min, repeat every
      <Input
        name={`${name}periodInMinutes`}
        placeholder={"1"}
        type={'number'}
        className={'ml-2 badge badge-grey cursor-pointer'}
      /> min
    </>
  )
}

export const AlarmTrigger = {
  Control,
  scheme,
  hooks,
  mode: SCENARIO_EXECUTION_MODE.BG,
  label: "By Schedule",
  icon: TbClock,
}

