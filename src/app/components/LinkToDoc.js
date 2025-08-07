import React from "react";

const LinkToDoc = ({children, href}) => {
  return (
    <>
      <a target={'_blank'} href={href}
         rel="noreferrer"> {children} </a>
    </>

  )
}

export default LinkToDoc;
