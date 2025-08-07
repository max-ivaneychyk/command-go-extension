import {useFormContext} from "react-hook-form";
import Toggle from "./Toggle";
import React from "react";
import {useIncreaseHistoryVersion} from "../hooks/useIncreseHistoryVersion";

export const useOptional = ({name, enableHandler = true, as}) =>{
  const {watch, setValue} = useFormContext();
  const optional = watch(`${name}$$skip`);
  const increase = useIncreaseHistoryVersion();
  const onToggle = () => {
    setValue(`${name}$$skip`, !optional, {shouldTouch: true, shouldDirty: true, shouldValidate: true});
    increase();
  };

  const jsx = (
    <Toggle
      small
      as={as}
      enabled={!optional}
      onToggle={enableHandler ? onToggle : undefined}
      className={'mr-1'}
    />
  )

  return {
    jsx,
    onToggle,
    className: optional ? "line-through opacity-50 grayscale" : '',
    optional: !!optional
  }
}

const Optional = ({children, name}) => {
  const {jsx, className} = useOptional({name});

  return (
    <div className={`flex items-center ${className}`}>
      {jsx}
      {children}
    </div>
  )
}

export default Optional;
