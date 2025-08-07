import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./Array.prototype.every.run";
import {ArrayMapCommand, ARRAY_METHOD} from "./Array.prototype.map";

const scheme = {
  ...ArrayMapCommand.scheme,
  type: ARRAY_METHOD.EVERY,
}

export const ArrayEveryCommand = {
  icon: <IconCommand Svg={"every"} className={ICON_COLOR.YELLOW}/>,
  Control: ArrayMapCommand.Control,
  run,
  scheme,
}

