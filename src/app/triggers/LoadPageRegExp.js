import React from 'react'
import Input from "../components/Input";
import {TRIGGERS} from "../const/triggers";
import Dropdown from "../components/Dropdown";
import {actions} from "./LoadPage";
import {SCENARIO_EXECUTION_MODE} from "../const/scheme";

const scheme = {
  type: TRIGGERS.LOAD_URL_REG_EXP,
  label: "Site URL RegExp",
  status: actions[0].id,
  regexp: "*://*/*",
}

const Control = ({name}) => {
  return (
    <>
      Page URL RegExp
      <Input name={`${name}regexp`} placeholder={"Type URL RegExp"}
             className={'ml-2 badge badge-grey cursor-pointer'}/>
      when <Dropdown
      options={actions}
      label={''}
      name={`${name}status`}
    />
    </>
  )
}

export const URLLoadRegExpTrigger = {
  Control,
  scheme,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  label: "Load Site URL RegExp",
}

