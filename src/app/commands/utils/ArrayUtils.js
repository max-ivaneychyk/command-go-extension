import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import {buildUtilCommands} from "./buildUtilCommands";
import { MdDataArray } from "react-icons/md";
import arrayUtilsConf from "./ArrayUtils.conf";
import run from './ArrayUtils.run'
import {COMMANDS} from "../../const/commands";

export const ArrayUtilsCommand = {
  ...buildUtilCommands({
    utils: arrayUtilsConf,
    type: COMMANDS.ARRAY_UTILS
  }),
  run,
  icon: <IconCommand Svg={MdDataArray} className={ICON_COLOR.GREEN}/>,
  label: "Array Utils",
}


