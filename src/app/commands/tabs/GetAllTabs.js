import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./OpenTab.run";
import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import {TEXT} from "../../const/messages";
import {TbBrowserCheck} from "react-icons/tb";
import {COMMANDS} from "../../const/commands";

const scheme = {
  type: COMMANDS.GET_ALL_TABS,
  saveTo: "",
}

const Control = ({name}) => {
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text: ""})

  return (
    <>
      Get all tabs and {TEXT.ASSIGN_TO}{saveToJsx}
    </>
  )
}


export const GetAllTabsCommand = {
  label: "Get all Tabs",
  icon: <IconCommand Svg={TbBrowserCheck} className={ICON_COLOR.BLUE}/>,
  Control,
  run,
  scheme,
  group: "",
}

