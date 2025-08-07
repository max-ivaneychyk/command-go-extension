import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import {getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import ExecuteIn from "../../components/ExecuteIn";
import run from "./WriteDataToDB.run";
import {RiDatabase2Fill} from "react-icons/ri";
import {COMMANDS} from "../../const/commands";

const scheme = {
  type: COMMANDS.WRITE_TO_DB,
  main: false,
  dbName: getInitialScheme(),
  key: getInitialScheme(),
  value: ""
}

const Control = ({name}) => {
  const {jsx: selectFromJsx} = useSelectFrom({
    group: `${name}key`,
  })
  const {jsx} = useSelectFrom({
    group: `${name}dbName`,
  })
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}value`, text: ""})

  return (
    <>
      Write data {saveToJsx} to IndexedDB {jsx} by key {selectFromJsx} <ExecuteIn name={name} />
    </>
  )
}


export const WriteDataToDBCommand = {
  icon:  <IconCommand Svg={RiDatabase2Fill} className={ICON_COLOR.YELLOW}/>,
  label: "Write Property To IndexDB",
  Control,
  run,
  scheme,
}



