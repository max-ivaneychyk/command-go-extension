import React from 'react';
import {MdClose, MdContentCopy} from "react-icons/md";


const IconClose = ({
                     onClick,
                     className = 'group !rounded-3xl p-1 z-10 absolute action border border-surface-border -right-2 shadow -top-3 bg-surface '
                   }) => (
  <button
    type="button"
    className={className}
    onClick={onClick}>
    <MdClose className={'text-gray-400 dark:text-white group-hover:text-red-500 '}/>
  </button>
);

export const IconDrag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
       className="w-4 h-4 text-gray-400 select-none">
    <path fillRule="evenodd"
          d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
          clipRule="evenodd"/>
  </svg>
)

export const IconCopy  = MdContentCopy;

export default IconClose
