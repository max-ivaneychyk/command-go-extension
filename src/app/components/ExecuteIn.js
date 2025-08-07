import React from "react";
import Dropdown from "./Dropdown";

const options = [
  {name: 'browser background', id: true},
  {name: 'current site', id: false},
];

const ExecuteIn = ({name}) => {
  return (
    <>
      Execution context:
      <Dropdown
        options={options}
        label={''}
        name={`${name}main`}
      />
    </>
  )
}

export default ExecuteIn;
