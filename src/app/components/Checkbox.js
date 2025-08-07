import React from "react";
import Dropdown from "./Dropdown";

const def_options = [
  {name: 'Yes', id: true},
  {name: 'No', id: false},
]

const Checkbox = ({name, options = def_options}) => {
  return (
    <>
      <Dropdown
        options={options}
        label={''}
        name={`${name}`}
      />
    </>
  )
}

export default Checkbox;
