import {useCollapse} from "../../hooks/useCollapse";
import {Commands} from "../../containers/Commands";
import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import {Args} from "../../components/Args";
import React from 'react';
import {SCHEME_KEYS} from "../../const/scheme";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import FuncIcon from "../../icons/func";
import NestedView from "../../components/NestedView";
import Command from "../../components/Command";
import {MODE} from "../../hooks/useVariablesDropDown";
import run from "./Function.run";
import {COMMANDS} from "../../const/commands";
import Return from "../../components/Return";

const scheme = {
  type: COMMANDS.FUNC,
  saveTo: "",
  func: '',
  arguments: [],
  commands: [],
  [SCHEME_KEYS.SCOPED]: true
}

const Control = ({name}) => {
  const collapse = useCollapse();
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text: ""})
  const {jsx: funcJsx} = useSaveResultTo({name: `${name}func`, text: "", mode: MODE.FUNC, scopeShift: -1})

  return (
    <>
      {collapse.control}
      Define function
      {funcJsx}<Args prefixName={name}/>
      {collapse.render(
        <NestedView>
          <Commands prefixName={name} nested/>
          <div className={'py-2'}>
            <Command className={'!mx-4'}>
              <Return/> {saveToJsx}
            </Command>
          </div>
        </NestedView>
      )}
    </>
  )
}


export const FunctionCommand = {
  icon:  <IconCommand Svg={FuncIcon} className={ICON_COLOR.GREEN} />,
  Control,
  run,
  scheme,
  label: "Define Function",
  group: "Grouping and Reuse",
}


