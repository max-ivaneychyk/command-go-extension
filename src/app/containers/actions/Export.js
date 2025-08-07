import Tooltip from "../../components/Tooltip";
import {PiDownloadBold} from "react-icons/pi";
import React from "react";
import {useManageScript} from "../../hooks/useManageList";
import {useFormContext} from "react-hook-form";


const Export = ({hint}) => {
  const {watch, getValues} = useFormContext();
  const schema = watch('$$schema')
  const {onExport} = useManageScript(schema);

  const exportJSON = () => {
    const model = {...getValues(), errors: {}, info: {}}
    onExport(model)
  }

  return (
    <Tooltip hint={hint}>
      <button
        onClick={exportJSON}
        type={'button'}
        className="badge badge-grey !inline-flex">
        <PiDownloadBold className={'mr-1 inline w-5 h-5'}/>
        Download
      </button>
    </Tooltip>
  )
}

export default Export
