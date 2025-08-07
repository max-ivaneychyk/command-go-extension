import Dropdown from "../components/Dropdown";
import React from 'react';

const scenarios = [
  {name: "Kira dsd", id: "ms"},
  {name: "sTest ec", id: "sec"},
  {name: "Tab 1 ", id: "min"},
]

const targets = [
  {name: "Current", id: "ms"},
  {name: "Tab Id", id: "sec"},
  {name: "TabId and IframeId", id: "min"},
]

const scheme = {
  type: "CALL_NEXT_SC",
  symlinkId: "", // variable
  target: null,
}
/// TODO - not enabled
const run = async ({format, delay}, {getProperty}) => {
  // const delayInt = getSourceValue(delay, {getProperty});
  //
  // Validator.asNumber(delayInt, "delay")
  // Validator.asPositiveNumber(delayInt, "delay");
  //
  // return new Promise(resolve => {
  //   const formatToTime = {
  //     "ms": 1,
  //     "sec": 1000,
  //     "min": 60 * 1000
  //   }
  //   setTimeout(resolve, delayInt * formatToTime[format])
  // })
}

const Control = ({name}) => {
  return (
    <>
      Call Next
      <Dropdown
        options={scenarios}
        label={''}
        name={`${name}symlinkId`}
      />
      with target
      <Dropdown
        options={targets}
        label={''}
        name={`${name}target`}
      />
    </>
  )
}

export const CallNextScenarioCommand = {
  icon: '>>',
  Control,
  run,
  scheme,
  label: "CallNextScenarioCommand"
}


