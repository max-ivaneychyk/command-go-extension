import Tooltip from "./Tooltip";
import {InfoIcon} from "lucide-react";
import React from "react";


const Hint = ({hint}) => {
  return (
    <Tooltip hint={hint} closeOnClick={false} trigger={'click'}>
      <InfoIcon className={'inline-flex h-4 w-4 ml-1 cursor-pointer'}/>
    </Tooltip>
  )
}

export default Hint
