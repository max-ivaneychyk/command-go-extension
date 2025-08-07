import Popper from "./Poper";
import React from "react";


const Tooltip = ({children, hint, enterable, delay, closeOnClick, trigger = 'hover', placement, className}) => {
  return (
    <Popper
      delay={delay}
      closeOnClick={closeOnClick}
      content={hint}
      placement={placement}
      trigger={trigger}
      enterable={enterable}
      className={`bg-black dark:bg-black dark:text-white px-4 py-2 text-[18px] max-w-[400px] ${className}`}>
      {children}
    </Popper>
  )
}
export default Tooltip
