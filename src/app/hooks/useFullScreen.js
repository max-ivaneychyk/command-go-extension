import React, {cloneElement, Fragment, useState} from "react";
import {createPortal} from "react-dom";
import {MdOutlineZoomInMap, MdOutlineZoomOutMap} from "react-icons/md";

export const useFullScreen = () => {
  const [enable, toggle] = useState(false);

  const onClose = () => {
    document.body.style.overflow = ''
    toggle(false)
  }

  const render = (jsx) => {
    return (
      <Fragment key={enable}>
        {jsx}
        {enable && createPortal(
          <div
            onClick={onClose}
            className={'fixed top-0 pt-[80px] px-2 left-0 w-full h-screen overflow-y-auto z-30 bg-black/70 dark:bg-black/90 fullscreen'}>
            <div onClick={e => e.stopPropagation()}>{cloneElement(jsx)}</div>
          </div>, document.body)}
      </Fragment>
    );
  }

  return {
    render,
    isPortal: enable,
    control: enable ?
      <MdOutlineZoomInMap className={'fullscreen-icon'} onClick={onClose}/> :
      <MdOutlineZoomOutMap className={'fullscreen-icon'} onClick={() => {
        document.body.style.overflow = 'hidden'
        toggle(true)
      }}/>


  }
}
