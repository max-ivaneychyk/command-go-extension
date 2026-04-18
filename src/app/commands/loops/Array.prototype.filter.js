import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./Array.prototype.filter.run";
import {ArrayMapCommand, ARRAY_METHOD} from "./Array.prototype.map";
import {TbFilter} from "react-icons/tb";

const scheme = {
  ...ArrayMapCommand.scheme,
  type: ARRAY_METHOD.FILTER,
}

export const ArrayFilterCommand = {
  icon: <IconCommand Svg={TbFilter} className={ICON_COLOR.YELLOW}/>,
  Control: ArrayMapCommand.Control,
  run,
  scheme,
}

