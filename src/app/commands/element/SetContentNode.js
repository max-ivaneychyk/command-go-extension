import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import {getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import IconCommand from "../../components/IconCommand";
import run from "./SetContentNode.run";
import {CgCodeSlash} from "react-icons/cg";
import {COMMANDS} from "../../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../../const/scheme";

const scheme = {
  type: COMMANDS.INNER_HTML_NODE,
  node: "",
  html: getInitialScheme(),
}

const Control = ({name}) => {
  const {jsx} = useSaveResultTo({name: `${name}node`, text:""})
  const {jsx: selectFromJsx} = useSelectFrom({
    group: `${name}html`,
    placeholder: '<p>Hello</p>'
  })

  return (
    <>
      Set element  {jsx} HTML content {selectFromJsx}
    </>
  )
}


export const SetContentNodeCommand = {
  icon:  <IconCommand Svg={CgCodeSlash} />,
  Control,
  run,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  scheme,
  label: "Set Element HTML "
}



