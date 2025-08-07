import {SCENARIO_EXECUTION_MODE, SCHEME_AS, UI_TABS} from "../../const/scheme";
import React from "react";
import {useFormContext} from "react-hook-form";

const Breadcrumbs = ({onGoBack}) => {
  const {watch, formState: {isDirty},} = useFormContext();
  const name = watch("$name");
  const schema = watch('$$schema');
  // const mode = watch('$$executionIn') ?? SCENARIO_EXECUTION_MODE.CONTENT;

  const handleClickBack = () => {
    if (!isDirty)return onGoBack();

    const confirmed = window.confirm('Are you sure you want to leave the form? You have unsaved changes.');

    if (confirmed) {
      onGoBack()
    }
  };

  return (
    <>
      <button
        className={'badge-blue ml-3 !border-transparent !px-1 mr-1 cursor-pointer rounded-xl'}
        onClick={handleClickBack}
      >
        {UI_TABS[schema]}
      </button>
      <span className={'truncate'}>/ {name}</span>
    </>
  )
}

export default Breadcrumbs
