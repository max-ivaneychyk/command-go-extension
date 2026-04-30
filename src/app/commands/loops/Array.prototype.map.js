import {MODE, useVariablesDropDown} from "../../hooks/useVariablesDropDown";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import {TEXT} from "../../const/messages";
import Dropdown from "../../components/Dropdown";
import run from "./Array.prototype.map.run";
import {ARRAY_METHOD as methods} from "../../const/array";
import {TbArrowsExchange} from "react-icons/tb";

export const ARRAY_METHOD = methods

const scheme = {
  type: ARRAY_METHOD.MAP,
  from: ``,
  func: ``,
  saveTo: ``,
}

const options = [
  {id: ARRAY_METHOD.MAP, name: ".map", view: "map"},
  {id: ARRAY_METHOD.FILTER, name: ".filter", view: "filter"},
  {id: ARRAY_METHOD.FIND, name: ".find", view: "find"},
  {id: ARRAY_METHOD.SOME, name: ".some", view: "some"},
  {id: ARRAY_METHOD.EVERY, name: ".every", view: "every"},
]

const Control = ({name}) => {
  const {jsx: source} = useVariablesDropDown({
    label: "",
    name: `${name}from`
  });

  const {jsx: dropDownResultJsx} = useVariablesDropDown({
    label: "",
    name: `${name}saveTo`
  });

  const {jsx: func} = useVariablesDropDown({
    label: "",
    name: `${name}func`,
    mode: MODE.FUNC
  });

  return (
    <>
      {source}.<Dropdown name={`${name}type`} options={options}/>({func})
      {TEXT.ASSIGN_TO} {dropDownResultJsx}
    </>
  )
}


export const ArrayMapCommand = {
  icon: <IconCommand Svg={TbArrowsExchange} className={ICON_COLOR.YELLOW}/>,
  Control,
  run,
  scheme,
}

