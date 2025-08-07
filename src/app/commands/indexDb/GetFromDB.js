import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import {getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import ExecuteIn from "../../components/ExecuteIn";
import {TEXT} from "../../const/messages";
import {RiDatabase2Fill} from "react-icons/ri";
import run from './GetFromDB.run'
import {COMMANDS} from "../../const/commands";

const scheme = {
  type: COMMANDS.GET_FROM_DB,
  main: false,
  dbName: getInitialScheme(),
  key: getInitialScheme(),
  saveTo: ""
}


const Control = ({name}) => {
  const {jsx: selectFromJsx} = useSelectFrom({
    group: `${name}key`,
  })
  const {jsx} = useSelectFrom({
    group: `${name}dbName`,
  })

  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text:""})

  return (
    <>
      Get data from {jsx}IndexedDB by key {selectFromJsx}  {TEXT.ASSIGN_TO}{saveToJsx}  <ExecuteIn name={name} />
    </>
  )
}


export const GetDataFromDBCommand = {
  icon:  <IconCommand Svg={RiDatabase2Fill} className={ICON_COLOR.BLUE} />,
  label: "Get Property From IndexDB",
  Control,
  run,
  scheme,
  group: "Local Database",
}



