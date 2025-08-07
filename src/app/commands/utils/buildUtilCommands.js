import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import Dropdown from "../../components/Dropdown";
import {Args} from "../../components/Args";
import React from "react";
import {getInitialScheme, SelectFrom} from "../../hooks/useSelectFrom";
import {useFormContext} from "react-hook-form";
import {TEXT} from "../../const/messages";
import {isPrototype} from "./buildUtilCommands.run";


export const buildUtilCommands = ({utils, type}) => {
  const options = Object.keys(utils).map(name => ({
    name,
    id: name,
    view: isPrototype(name) ?
      name.replace(/\w*.prototype/, "") :
      name
  }))

  const [{id: selectedId}] = options;

  const scheme = {
    type,
    from: getInitialScheme(),
    saveTo: "",
    func: selectedId,
    arguments: Array(utils[selectedId].arguments.min)
      .fill({})
      .map(() => {
        return getInitialScheme();
      })
  }

  const Control = ({name}) => {
    const {watch, setValue} = useFormContext();
    const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text: ""})
    const funcName = watch(`${name}func`);
    const params = watch(`${name}arguments`);
    const {min, max} = utils[funcName]?.arguments ?? {};

    return (
      <>
        {isPrototype(funcName) && <SelectFrom group={`${name}from`}/>}
        <Dropdown
          options={options}
          name={`${name}func`}
          onSetValue={id => {
            const newArgs = [...params].slice(0, utils[id].arguments.max);

            if (newArgs.length < utils[id].arguments.min) {
              newArgs.push(
                ...Array(utils[id].arguments.min - newArgs.length)
                  .fill({})
                  .map(() => {
                    return getInitialScheme();
                  })
              )
            }

            setValue(`${name}arguments`, newArgs);
          }}
        /><Args prefixName={name} min={min} max={max}/>
        {TEXT.ASSIGN_TO}{saveToJsx}
      </>
    )
  }

  return {
    scheme,
    Control,
  }
}
