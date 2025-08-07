import React from "react";

const NestedView = ({children, className = ''}) => {
  return (
    <div className={`rounded bg-body-layout mt-2 pt-2 ${className}`}>
      {children}
    </div>
    )
}


export default NestedView;
