import React from "react";


const Code = ({children}) => {
  return (
    <code className={'bg-black text-white rounded p-4 block'}>
      {children}
    </code>
  )
}

export default Code;
