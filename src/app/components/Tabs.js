import React from "react";

const Tabs = ({children}) => {
  return (
    <div className={'inline-flex items-center justify-center select-none'}>{children}</div>
  )
}

export const Tab = ({children, onClick, active, className}) => {
  return <p onClick={onClick} className={` ${className} border border-surface-border border-b-0 text-center bg-surface duration-300 cursor-pointer transition-opacity mt-0 px-3 py-2 rounded-t-xl shadow ${active ? "opacity-100" : "opacity-50"}`}>
    {children}
  </p>
}

export default Tabs
