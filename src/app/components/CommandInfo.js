import React from 'react';
import Popper from "./Poper";
import {MdInfo} from "react-icons/md"

const CommandInfo = ({children}) => {
  return (
    <Popper
      className={'ml-2'}
      content={children}
      trigger={'hover'}
    >
      <span className={'absolute inline-flex left-[38px] top-[26px] opacity-40 hover:opacity-100 transition-opacity'}>
           <MdInfo className={'text-blue-500'}/>
      </span>
    </Popper>
  )
}

export default CommandInfo
