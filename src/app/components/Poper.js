import {Popover, Whisper} from "rsuite";
import {useRef} from "react";
import React from 'react';


const Popper = ({children, content, delay, enterable, placement  = 'autoVertical', containerClassName = '', closeOnClick, trigger = 'click', className = '', arrow = false}) => {
  const ref = useRef();

  return (
    <Whisper
      delay={delay}
      preventOverflow
      placement={placement}
      trigger={trigger}
      ref={ref}
      className={containerClassName}
      enterable={enterable}
      speaker={
        <Popover arrow={arrow} className={`p-1 ${className}`} onClick={() => {
         if (closeOnClick) ref.current?.close();
        }}>
          {content}
        </Popover>
      }
    >
      {children}
    </Whisper>
  )
}

export default Popper
