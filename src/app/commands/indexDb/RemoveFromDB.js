import React from 'react';
import {getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import ExecuteIn from "../../components/ExecuteIn";
import run from "./RemoveFromDB.run";
import { RiDatabase2Fill } from "react-icons/ri";
import {COMMANDS} from "../../const/commands";

const scheme = {
  type: COMMANDS.REMOVE_FROM_DB,
  main: false,
  dbName: getInitialScheme(),
  key: getInitialScheme(),
}

const Control = ({name}) => {
  const {jsx: selectFromJsx} = useSelectFrom({
    group: `${name}key`,
  })
  const {jsx} = useSelectFrom({
    group: `${name}dbName`,
  })

  return (
    <>
      Remove from IndexedDB {jsx} by key {selectFromJsx}       <ExecuteIn name={name} />
    </>
  )
}


export const RemoveDataFromDBCommand = {
  icon:  <IconCommand Svg={RiDatabase2Fill} className={ICON_COLOR.RED} />,
  label: "Remove From IndexedDB",
  Control,
  run,
  scheme,
}



