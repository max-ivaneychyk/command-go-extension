import React, {useCallback, useContext, useState} from "react";
import AnimateHeight from "react-animate-height";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {CommandIdCtx} from "../ctx/commandID";

export const COLLAPSE = {
  OPEN: 'auto',
  CLOSED: 0
}

const useCollapseStateless = ({height, setHeight, className}) => {
  const control = (
    <button
      className={`relative top-[2px] badge-blue badge inline-flex items-center h-[20px] mr-2 ${className}`}
      aria-expanded={height !== COLLAPSE.CLOSED}
      type={'button'}
      onClick={() => setHeight(height === COLLAPSE.CLOSED ? COLLAPSE.OPEN : COLLAPSE.CLOSED)}
    >
      {height ? <IoIosArrowUp/> : <IoIosArrowDown/>}
    </button>
  )

  const render = jsx => {
    return (
      <AnimateHeight
        duration={500}
        height={height} // see props documentation below
      >
        {jsx}
      </AnimateHeight>
    )
  }

  return {
    control,
    visible: !!height,
    render
  }
}

const map = new Map();

export const useCollapse = ({initial = COLLAPSE.CLOSED, className} = {}) => {
  const commandId = useContext(CommandIdCtx);
  const [height, _setHeight] = useState(() => map.get(commandId) ?? initial);

  const setHeight = useCallback((val) => {
    _setHeight(val);
    map.set(commandId, val)
  }, [commandId])

  return useCollapseStateless({
    className,
    height,
    setHeight
  })
}

// export const useFormCollapse = ({name, suffix = '$$collapse',  initial = COLLAPSE.CLOSED}) => {
//   const {watch, setValue} = useFormContext();
//   const fullName = name + "" + suffix;
//   const height = watch(fullName) ?? initial;
//
//   const setHeight = value => {
//     setValue(fullName, value, {shouldDirty: true, shouldTouch: true})
//   };
//
//   return useCollapseStateless({
//     height,
//     setHeight
//   })
// }
