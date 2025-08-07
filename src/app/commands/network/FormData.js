import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import {
  getInitialScheme,
  useSelectFrom,
  variableOption
} from "../../hooks/useSelectFrom";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./FormData.run";
import {TEXT} from "../../const/messages";
import { IoEarthOutline } from "react-icons/io5";
import {COMMANDS} from "../../const/commands";

const scheme = {
  type: COMMANDS.FORM_DATA,
  from: getInitialScheme({
    as: variableOption.id,
    value: ``
  }),
  saveTo: "",
}

const Control = ({name}) => {
  const {jsx: selectFromJsx} = useSelectFrom({
    label: "",
    group: `${name}from`,
  })
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text:""})

  return (
    <>
      Create FormData from
      {selectFromJsx}
      {TEXT.ASSIGN_TO}{saveToJsx}
    </>
  )
}


export const FormDataCommand = {
  icon: <IconCommand Svg={IoEarthOutline} className={ICON_COLOR.BLUE}/>,
  Control,
  run,
  scheme,
}
