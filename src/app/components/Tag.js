import React from "react";


const Tag = ({children}) => {
  return (
    <div className={'tag '}>
      <p className={'inline-flex items-center'}>{children}</p>
    </div>
  )
}

export default Tag;
