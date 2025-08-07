import React from 'react';


const Placeholder = ({children, className}) => {
  return (
    <p className={` ${className} dark:bg-[#242424] dark:border dark:border-[#373737] dark:text-white text-gray-500 bg-blue-50 py-3 font-thin w-full text-center rounded my-2`}> {children} </p>
  )
}

export default Placeholder
