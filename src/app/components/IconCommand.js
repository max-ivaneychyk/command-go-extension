import React from "react"

export const ICON_COLOR = {
  YELLOW: "bg-amber-400 dark:text-black ",
  GREEN: "bg-green-400 text-black/80",
  BLUE: "bg-blue-500 text-white ",
  GREY: "bg-black/40 text-white",
  RED: "bg-red-500 text-white"
};
const IconCommand = ({Svg, className = ICON_COLOR.YELLOW}) => {
  return (
    <div className={`inline ${className} rounded mr-2 p-1.5 dark:opacity-80 `}>
      {typeof Svg !== "function" ?
        <p className={'inline-flex h-6 min-w-[32px] text-center justify-center items-center'}>{Svg}</p> :
        <Svg className={'inline-flex justify-center items-center min-w-[32px] h-6 py-0.5'}/>}
    </div>
  )
}

export default IconCommand
