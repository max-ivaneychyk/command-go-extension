import React from 'react';

const Command = ({children, className = '', isDirty, onMouseEnter, onMouseLeave}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${className} ${isDirty ? "bg-gray-400" : "bg-white"} command-block command`}>
      {children}
    </div>
  )
}

export default Command
