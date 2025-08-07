import {Commands} from "../containers/Commands.jsx";
import {useCollapse} from "../hooks/useCollapse";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../components/IconCommand";
import NestedView from "../components/NestedView";
import Input from "../components/Input";
import { FaRegObjectGroup } from "react-icons/fa6";
import run from "./Group.run";
import {COMMANDS} from "../const/commands";

const scheme = {
  type: COMMANDS.GROUP,
  name: " name 1",
  commands: [],
}

const Control = ({name}) => {
  const collapse = useCollapse()

  return (
    <>
      {collapse.control} Collapsed Group <Input name={`${name}name`}/>
      {collapse.render(
        <NestedView>
          <Commands prefixName={name} nested/>
        </NestedView>
      )}
    </>
  )
}


export const GroupCommand = {
  icon: <IconCommand Svg={FaRegObjectGroup} className={ICON_COLOR.GREEN}/>,
  Control,
  label: "Group",
  run,
  scheme,
}

