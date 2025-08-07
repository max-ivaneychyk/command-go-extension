import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import {getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./GetEntriesFromDB.run";
import ExecuteIn from "../../components/ExecuteIn";
import {TEXT} from "../../const/messages";
import {RiDatabase2Fill} from "react-icons/ri";
import {COMMANDS} from "../../const/commands";

const scheme = {
  type: COMMANDS.GET_ENTRIES_FROM_DB,
  dbName: getInitialScheme(),
  main: false,
  saveTo: ""
}

const Control = ({name}) => {
  const {jsx} = useSelectFrom({
    group: `${name}dbName`,
  });

  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text:""})

  return (
    <>
      Get entries from IndexedDB{jsx}
      {TEXT.ASSIGN_TO}{saveToJsx}   <ExecuteIn name={name} />
    </>
  )
}


export const GetEntriesFromDBCommand = {
  icon:   <IconCommand Svg={RiDatabase2Fill} className={ICON_COLOR.BLUE} />,
  label: "Get Entries From IndexDB",
  Control,
  run,
  scheme,
}



