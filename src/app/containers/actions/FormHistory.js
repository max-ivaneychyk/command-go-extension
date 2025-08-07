import {useFormHistory} from "../../hooks/useFormHistory";
import {GrUndo, GrRedo} from 'react-icons/gr'
import Tooltip from "../../components/Tooltip";
import React from "react";

const FormHistory = () => {
  const {next, previous, isPreviousDisabled, isNextDisabled, historyIndex, history} = useFormHistory();

  return (
    <div className={'flex'}>
      <Tooltip hint={'Undo Changes'}>
        <button
          onClick={previous}
          type={'button'}
          disabled={isPreviousDisabled}
          className="badge badge-grey !inline-flex disabled:opacity-50 !mr-0">
          <GrUndo className={'ml-1 inline w-5 h-5'}/>
        </button>
      </Tooltip>
      <Tooltip hint={'Redo Changes'}>
        <button
          onClick={next}
          type={'button'}
          disabled={isNextDisabled}
          className="badge badge-grey !inline-flex disabled:opacity-50 !mr-0">
          <GrRedo className={'inline w-5 h-5'}/>
        </button>
      </Tooltip>
      <div className={'inline-flex items-center badge-grey mr-2 pt-0.5 !border-transparent w-max'}> {historyIndex + 1} of {history.length} </div>
    </div>
  )
}

export default FormHistory
