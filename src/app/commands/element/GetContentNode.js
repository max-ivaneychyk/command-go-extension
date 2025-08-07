import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./GetContentNode.run";
import {TEXT} from "../../const/messages";
import {CgCodeSlash} from "react-icons/cg";
import {COMMANDS} from "../../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../../const/scheme";

const scheme = {
  type: COMMANDS.GET_INNER_HTML_NODE,
  node: "",
  saveTo: "",
}

const Control = ({name}) => {
  const {jsx} = useSaveResultTo({name: `${name}node`, text:""})
  const {jsx: jsxSaveTo} = useSaveResultTo({name: `${name}saveTo`, text:""})

  return (
    <>
      Get content of element {jsx}  {TEXT.ASSIGN_TO}{jsxSaveTo}
    </>
  )
}


export const GetContentNodeCommand = {
  icon:   <IconCommand Svg={CgCodeSlash}  className={ICON_COLOR.BLUE}/>,
  label: "Get InnerText of Element",
  Control,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  run,
  scheme,
}



