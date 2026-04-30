import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import {buildUtilCommands} from "./buildUtilCommands";
import utils from './StringUtils.conf'
import run from './StringUtils.run'
import {COMMANDS} from "../../const/commands";
import {TbLetterCase} from "react-icons/tb";

export const StringUtilsCommand = {
  ...buildUtilCommands({
    utils,
    type: COMMANDS.STRING_UTILS
  }),
  run,
  icon: <IconCommand Svg={TbLetterCase} className={ICON_COLOR.GREEN}/>,
  label: "String Utils",
}


