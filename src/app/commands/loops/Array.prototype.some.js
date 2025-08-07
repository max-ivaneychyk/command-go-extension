import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./Array.prototype.some.run";
import {ArrayMapCommand, ARRAY_METHOD} from "./Array.prototype.map";

const scheme = {
  ...ArrayMapCommand.scheme,
  type: ARRAY_METHOD.SOME,
}

export const ArraySomeCommand = {
  icon: <IconCommand Svg={"some"} className={ICON_COLOR.YELLOW}/>,
  Control: ArrayMapCommand.Control,
  run,
  scheme,
}

