import {FormProvider} from "react-hook-form";
import {STATUS} from "../classes/Scenario";
import {MdRefresh} from "react-icons/md";
import React from "react";
import {SCHEME_AS} from "../const/scheme";
import {useManageScript} from "../hooks/useManageList";
import History from "../components/History";
import Tooltip from "../components/Tooltip";
import {useHotkeys} from "react-hotkeys-hook";
import FormHistory from "./actions/FormHistory";
import Export from "./actions/Export";
import Breadcrumbs from "./actions/Breadcrumbs";
import Save from "./actions/Save";
import {trackExecuting} from "../funcs/track";


export const FormUserScripts = ({children, methods, onGoBack, Executor, focused}) => {
  const {handleSubmit,} = methods;
  const {onSave, message, toast} = useManageScript(SCHEME_AS.USER_SCRIPT)

  const save = async () => {
    methods.setValue("errors", {});

    await onSave(methods)
      .catch(errors => {
        if(Array.isArray(errors))return errors;
        return Promise.reject(errors);
      })
      .then(results => {
        if(Array.isArray(results)) {
          results.forEach(trackExecuting(methods))
        }
      })
  }

  const onSubmit = async () => {
    await save();

    toast("Running...", 5 * 1000);

    const cacheScopes = methods.getValues("$$scopes");

    Executor.cleanUp();

    new Executor([], {reload: true})
      .onTrack(trackExecuting(methods))
      .execute(
        structuredClone(cacheScopes)
      )
      .catch((err) => {
        alert(err.message);
      })
  }

  useHotkeys('ctrl+s', () => {
    if(focused)save();
  });

  useHotkeys('ctrl+r', () => {
    if(focused)onSubmit();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {process.env.NODE_ENV === "development" && <History/>}

        {children}
        <div
          className={'fixed top-[35px] py-0.5 bg-white dark:bg-[#383838] z-40 flex items-center w-full shadow-[0_0_6px_-1px_rgba(0,0,0,0.3)]'}>
          <Breadcrumbs onGoBack={onGoBack}/>


          <p className={'ml-4 text-primary'}>{message}</p>

          <div className={'ml-auto mr-4 inline-flex items-center'}>
            <FormHistory/>
            <Export hint={'Download the script as a scenario file'}/>
            <Save onClick={save}/>

            <Tooltip
              hint={"Save script and reload current focused page"}>
              <button
                type={'submit'}
                className="badge-green badge !ml-auto !inline-flex !items-center !pr-1.5">
                <MdRefresh className={'mr-1 inline w-5 h-5'}/>
                Reload
              </button>
            </Tooltip>

          </div>
        </div>

      </form>
    </FormProvider>
  )
}
