import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import {Args} from "../../components/Args";
import React from 'react';
import FuncIcon from '../../icons/func'
import IconCommand from "../../components/IconCommand";
import {TEXT} from "../../const/messages";
import run from './CallFunction.run'
import {COMMANDS} from "../../const/commands";
import {getInitialScheme, inputOption, useSelectFrom, variableOption} from "../../hooks/useSelectFrom";
import {useCollapse} from "../../hooks/useCollapse";

const scheme = {
  type: COMMANDS.CALL_NATIVE_FUNC,
  saveTo: "",
  func: getInitialScheme({
    as: inputOption.id
  }),
  source: getInitialScheme({
    as: variableOption.id
  }),
  ctx: getInitialScheme({
    as: variableOption.id
  }),
  arguments: [],
}

const _components = [variableOption, inputOption];

const Control = ({name}) => {
  const {jsx: from} = useSelectFrom({ group: `${name}source`, components: [variableOption]})
  const {jsx: ctx} = useSelectFrom({ group: `${name}ctx`, components: [variableOption]})
  const {jsx: funcJsx} = useSelectFrom({ group: `${name}func`})
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text: ""})
  const collapse = useCollapse();

  return (
    <>
      {collapse.control} Call {from} method {funcJsx}<Args components={_components} prefixName={name}/> {TEXT.ASSIGN_TO}{saveToJsx}
      {collapse.render(
        <> with ctx: {ctx}</>
      )}
    </>
  )
}


export const CallNativeFunctionCommand = {
  icon:  <IconCommand Svg={FuncIcon} />,
  label: "Call Native Function",
  Control,
  run,
  scheme,
}


