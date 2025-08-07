import React from 'react';
import Input from "../components/Input";
import IconCommand, {ICON_COLOR} from "../components/IconCommand";
import { BiMessageEdit } from "react-icons/bi";
import run from "./Comment.run";
import {COMMANDS} from "../const/commands";

const scheme = {
  type: COMMANDS.COMMENT,
  className: "comment",
  comments: `Comment`, // variableName
}

const Control = ({name}) => {
  return (
    <Input
      className={'bg-transparent font-medium inline items-center cursor-pointer '}
      name={`${name}comments`}
      type={'text'}
    />
  )
}


export const CommentCommand = {
  icon: <IconCommand Svg={BiMessageEdit} className={`${ICON_COLOR.GREY} icon`}/>,
  Control,
  run,
  group: "Notes",
  label: "Add comment",
  scheme,
}

