import React from "react"

export const ICON_COLOR = {
  YELLOW: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
  GREEN: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
  BLUE: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  GREY: "bg-gray-100 text-gray-500 dark:bg-gray-700/50 dark:text-gray-400",
  RED: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
};
const IconCommand = ({Svg, className = ICON_COLOR.YELLOW}) => {
  return (
    <div className={`inline-flex items-center justify-center ${className} rounded-lg mr-2 p-1 min-w-[28px] h-7`}>
      {typeof Svg !== "function" ?
        <p className={'inline-flex text-[11px] font-bold text-center justify-center items-center'}>{Svg}</p> :
        <Svg className={'w-4 h-4'}/>}
    </div>
  )
}

export default IconCommand
