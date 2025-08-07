import {useVariablesDropDown} from "./useVariablesDropDown";
import React from 'react';

export const useSaveResultTo = ({name, text = 'and save to', mode, scopeShift} = {}) => {
  const {jsx: dropDownJsx, setVariables, variable} = useVariablesDropDown({
    label: "",
    name,
    mode,
    scopeShift
  });

  const save = (value) => {
    setVariables(prev => {
      return {
        ...prev,
        [variable?.name]: value
      }
    })
  }

  const jsx = (
    <>
      <p className="inline">{text}</p>
      {dropDownJsx}
    </>
  )

  return {jsx, save}
}
