import useTheme from "./useTheme";
import Toggle from "../components/Toggle";
import React from "react";

export const useSwitchTheme = () => {
  const {dark, onToggle} = useTheme();

  const jsx = (
    <div className={'inline-flex items-center '}>
      <span className={'mr-1.5'}>Dark Mode:</span> <Toggle onToggle={onToggle} enabled={dark}/>
    </div>
  )

  return {jsx}
}
