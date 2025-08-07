import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import {Args} from "../../components/Args";
import React, {useCallback} from 'react';
import FuncIcon from '../../icons/func'
import IconCommand from "../../components/IconCommand";
import {MODE} from "../../hooks/useVariablesDropDown";
import {TEXT} from "../../const/messages";
import run from './CallFunction.run'
import {COMMANDS} from "../../const/commands";
import {useFormContext} from "react-hook-form";
import {usePrevCommand} from "../../hooks/usePrevCommand";
import {inputOption, variableOption} from "../../hooks/useSelectFrom";

const scheme = {
  type: COMMANDS.CALL_FUNC,
  saveTo: "",
  func: "",
  arguments: [],
}

const _components = [variableOption, inputOption];

const Control = ({name}) => {
  const {watch} = useFormContext();
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text: ""})
  const {jsx: funcJsx} = useSaveResultTo({name: `${name}func`, text: "", mode: MODE.FUNC});
  const nameFunc = watch(`${name}func`);
  // find defined FUNC command
  const parentScheme = usePrevCommand(name, useCallback((scheme, _) => {
    return scheme.type === COMMANDS.FUNC && scheme.func === nameFunc
  }, [nameFunc]));
  // parse arguments definition (names)
  const annotations = parentScheme?.["arguments"]?.map(({value}) => value?.replace("$", ""));

  return (
    <>
      Call function
      {funcJsx}<Args components={_components} prefixName={name} annotations={annotations} max={annotations?.length}/> {TEXT.ASSIGN_TO}{saveToJsx}
    </>
  )
}


export const CallFunctionCommand = {
  icon:  <IconCommand Svg={FuncIcon} />,
  label: "Call Function",
  Control,
  run,
  scheme,
}


