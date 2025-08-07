import {MdClose} from "react-icons/md";
import React from "react";


const Remove = ({onClick}) => {
  return (
    <MdClose
      onClick={onClick}
      className={`dark:bg-[#242424] dark:border-[#373737] dark:text-white hover:text-red-500 cursor-pointer top-0.5 rounded bg-white border-gray-300 border text-gray-800 -ml-2.5 absolute right-0 z-10 scale-0 group-hover:scale-125 transition-transform translate-x-0 group-hover:translate-x-full opacity-0 group-hover:opacity-100`}
    />
  )
}

export default Remove
