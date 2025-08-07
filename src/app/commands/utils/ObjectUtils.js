import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./ObjectUtils.run";
import {buildUtilCommands} from "./buildUtilCommands";
import { MdDataObject } from "react-icons/md";
import utils from "./ObjectUtils.conf";
import {COMMANDS} from "../../const/commands";

export const ObjectUtilsCommand = {
  ...buildUtilCommands({
    utils: utils,
    type: COMMANDS.OBJECT_UTILS
  }),
  run,
  icon: <IconCommand Svg={MdDataObject} className={ICON_COLOR.GREEN}/>,
  label: "Object Utils",
  group: "Utils",
}


