import {useFormContext} from "react-hook-form";
import Tooltip from "../../components/Tooltip";
import {MdSave} from "react-icons/md";
import React from "react";


const Save = ({onClick, type = 'button'}) => {
  const {formState: {isDirty},} = useFormContext();

  return (
    <Tooltip hint={'Save - to the extension database'}>
      <button
        onClick={onClick}
        type={type}
        className={`badge ml-4 !inline-flex ${isDirty ? 'badge-green' : "badge-grey"}`}>
        <MdSave className={'mr-1 inline w-5 h-5'}/>
        Save
      </button>
    </Tooltip>
  )
}

export default Save;
