import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import {getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import ExecuteIn from "../../components/ExecuteIn";
import run from "./GetValuesFromDB.run";
import {TEXT} from "../../const/messages";
import {RiDatabase2Fill} from "react-icons/ri";
import {COMMANDS} from "../../const/commands";

const scheme = {
  main: false,
  type: COMMANDS.GET_VALUES_FROM_DB,
  dbName: getInitialScheme(),
  saveTo: ""
}


const Control = ({name}) => {
  const {jsx} = useSelectFrom({
    group: `${name}dbName`,
  });

  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text:""})

  return (
    <>
      Get values from IndexedDB {jsx}
      {TEXT.ASSIGN_TO}{saveToJsx}  <ExecuteIn name={name} />
    </>
  )
}


export const GetValuesFromDBCommand = {
  icon:   <IconCommand Svg={RiDatabase2Fill} className={ICON_COLOR.BLUE} />,
  label: "Get Values From IndexDB",
  Control,
  run,
  scheme,
}



