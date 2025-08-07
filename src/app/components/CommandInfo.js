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
      <span className={'action absolute inline-flex left-[38px] top-[26px]'}>
           <MdInfo className={'text-blue-500'}/>
      </span>
    </Popper>
  )
}

export default CommandInfo
