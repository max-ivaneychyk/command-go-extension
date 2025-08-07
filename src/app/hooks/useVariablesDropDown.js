import {useVariables} from "./useVariables";
import Dropdown, {classNames} from "../components/Dropdown";
import {useFormContext} from "react-hook-form";
import React, {useMemo} from 'react';
import Remove from "../components/Remove";
import {useIncreaseHistoryVersion} from "./useIncreseHistoryVersion";

export const MODE = {
  VAR: "$",
  FUNC: "fx:",
}

export const useVariablesDropDown = ({label, name, onClear, mode = MODE.VAR, allowCreate = true, scopeShift = 0}) => {
  const {map, variables, setVariables, onClear: removeVar} = useVariables()
  const {setValue,} = useFormContext();
  const updateVersion = useIncreaseHistoryVersion();

  const filteredVars = useMemo(() => {
    return variables.filter(({name, id}) => name.startsWith(mode))
  }, [mode, variables]);

  const onCreateNew = () => {
    const initial = {
      [MODE.VAR]: `${MODE.VAR}temp`,
      [MODE.FUNC]: `${MODE.FUNC}test`,
    }[mode];

    const message = {
      [MODE.VAR]: "Add a new variable",
      [MODE.FUNC]: "Add a new function",
    }[mode];

    let n = prompt(message, initial);

    if (!n) return;

    // prevent override $$ref property in scheme
    if (mode === MODE.VAR && n.startsWith(`${MODE.VAR}${MODE.VAR}`)) {
      n = n.replace(`${MODE.VAR}${MODE.VAR}`, "$_");
    }
    // should have format
    if (!n.startsWith(mode)) {
      n = mode + n;
    }

    setValue(name, n, {shouldTouch: true, shouldDirty: true});
    setVariables(n, scopeShift);
    updateVersion();
  }

  const onRemoveVar = (name) => {
    removeVar(name);
    updateVersion();
  }

  const jsx = <Dropdown
    options={filteredVars}
    label={label}
    color={'badge badge-yellow relative'}
    name={name}
    allowClear
    onClear={params => {
      if(onClear)onClear(params);
      updateVersion();
    }}
    renderItem={({name, global}) => {
      return <>
        <span className={'group relative pr-1 inline-flex'}>
          {name}
          <Remove
            onClick={(e) => {
              e.stopPropagation();
              onRemoveVar(name)
            }}
          />
        </span>
        <span className={`!ml-auto !px-0.5 !text-[9px] !flex badge ${global ? "badge-pink" : "badge-blue"}`}>
          {global ? "global" : "local"}
        </span>
      </>
    }}
    footer={allowCreate && <button
      type={'button'}
      onClick={onCreateNew}
      className={classNames(
        'text-gray-700 border-gray-200 border-t w-full sticky bottom-0 bg-white min-w-[120px]',
        'dark:text-white dark:border-transparent dark:bg-transparent hover:bg-transparent hover:text-[#0179ff]',
        'block px-2 py-1.5 text-[10px] underline hover:bg-gray-100 cursor-pointer ',
      )}
    >
      Add {mode === MODE.VAR ? "Variable" : "Function name"}
    </button>}
  />

  return {jsx, map, setVariables}
}
