import React from 'react';
import IconCommand, {ICON_COLOR} from "../components/IconCommand";
import {getInitialScheme, inputOption, useSelectFrom} from "../hooks/useSelectFrom";
import { BiNavigation } from "react-icons/bi";
import run from "./Redirect.run";
import {COMMANDS} from "../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../const/scheme";

const scheme = {
  type: COMMANDS.REDIRECT,
  to: getInitialScheme({
    value: '',
    as: inputOption.id
  }),
}



const Control = ({name}) => {
  const {jsx} = useSelectFrom({
    group: `${name}to`,
    placeholder: "https://...",
  })

  return (
    <>
      Redirect to {jsx}
    </>
  )
}

export const RedirectCommand = {
  icon: <IconCommand Svg={BiNavigation} className={ICON_COLOR.BLUE}/>,
  Control,
  run,
  scheme,
  group: "Navigation",
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  label: "Redirect"
}


