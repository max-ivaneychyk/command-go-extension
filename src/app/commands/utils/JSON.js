import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import Dropdown from "../../components/Dropdown";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./JSON.run";
import {getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import {TEXT} from "../../const/messages";
import { VscJson } from "react-icons/vsc";
import {COMMANDS} from "../../const/commands";

const list = [
  {name: "JSON.parse", id: "parse"},
  {name: "JSON.stringify", id: "stringify"}
]

const scheme = {
  type: COMMANDS.JSON,
  from: getInitialScheme(),
  saveTo: "$temp",
  func: "parse"
}

const Control = ({name}) => {
  const {jsx: saveTo} = useSaveResultTo({name: `${name}saveTo`, text: ""})
  const {jsx: from} = useSelectFrom({
    group: `${name}from`,
    placeholder: '{"key": "value"}'
  })
  return (
    <>  <Dropdown
      options={list}
      label={''}
      name={`${name}func`}
    />
      ({from}) {' '}
      {TEXT.ASSIGN_TO}{saveTo}
    </>
  )
}


export const JSONCommand = {
  icon: <IconCommand Svg={VscJson} className={ICON_COLOR.BLUE}/>,
  Control,
  run,
  scheme,
  label: 'JSON Utils',
}



