import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import {buildUtilCommands} from "./buildUtilCommands";
import { BiMath } from "react-icons/bi";
import utils from "./MathUtils.conf";
import run from "./MathUtils.run"
import {COMMANDS} from "../../const/commands";


export const MathUtilsCommand = {
  ...buildUtilCommands({
    utils: utils,
    type: COMMANDS.MATH_UTILS
  }),
  run,
  icon: <IconCommand Svg={BiMath} className={ICON_COLOR.GREEN}/>,
  label: "Math Utils",
}


