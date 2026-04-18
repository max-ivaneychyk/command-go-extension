import {useSaveResultTo} from "../hooks/useSaveResultTo";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../components/IconCommand";
import {getInitialScheme, inputOption, SelectFrom} from "../hooks/useSelectFrom";
import run from "./Set.run";
import {COMMANDS} from "../const/commands";
import {TbEdit} from "react-icons/tb";

const scheme = {
  type: COMMANDS.SET,
  saveTo: '', // var
  fields: [
    {
      key: getInitialScheme({as: inputOption.id}),
      value: getInitialScheme({as: inputOption.id})
    },
  ]
}

const Control = ({name}) => {
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text: ""})

  return (
    <>
      Set key:
      <SelectFrom
        placeholder={'result.data'}
        group={`${name}fields.0.key`}
      /> value:
      <SelectFrom
        placeholder={'result.data'}
        group={`${name}fields.0.value`}
      />
      to {saveToJsx}
    </>
  )
}


export const SetValueCommand = {
  icon:  <IconCommand Svg={TbEdit} className={ICON_COLOR.BLUE}/>,
  Control,
  label: 'Set value to Object',
  run,
  scheme,
}

