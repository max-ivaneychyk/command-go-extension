import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./NodeCreate.run";
import {dropdownOption, getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import {TEXT} from "../../const/messages";
import {CgCodeSlash} from "react-icons/cg";
import {COMMANDS} from "../../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../../const/scheme";

const tags = [
  {name: "button", id: 'button'},
  {name: "a", id: 'a'},
  {name: "div", id: 'div'},
]

const scheme = {
  type: COMMANDS.CREATE_NODE,
  tag: getInitialScheme({
    as: dropdownOption.id,
    value: tags[0].id
  }),
  saveTo: "",
}

const Control = ({name}) => {
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text:""})
  const {jsx: tag} = useSelectFrom({
    group: `${name}tag`,
    options: tags
  })

  return (
    <>
      Create element {tag}
      {TEXT.ASSIGN_TO}{saveToJsx}
    </>
  )
}


export const CreateNodeCommand = {
  icon: <IconCommand Svg={CgCodeSlash} className={ICON_COLOR.GREEN}/>,
  Control,
  run,
  scheme,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  label: "Create Element",
  group: "HTML Elements"
}



