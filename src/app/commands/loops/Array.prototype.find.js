import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./Array.prototype.find.run";
import {ArrayMapCommand, ARRAY_METHOD} from "./Array.prototype.map";

const scheme = {
  ...ArrayMapCommand.scheme,
  type: ARRAY_METHOD.FIND,
}

export const ArrayFindCommand = {
  icon: <IconCommand Svg={"find"} className={ICON_COLOR.YELLOW}/>,
  Control: ArrayMapCommand.Control,
  run,
  scheme,
}

