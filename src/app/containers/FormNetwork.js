import {FormProvider} from "react-hook-form";
import React from "react";
import {SCHEME_AS} from "../const/scheme";
import {useManageScript} from "../hooks/useManageList";
import History from "../components/History";
import {Scenario, STATUS} from "../classes/Scenario";
import {useHotkeys} from "react-hotkeys-hook";
import FormHistory from "./actions/FormHistory";
import Export from "./actions/Export";
import Breadcrumbs from "./actions/Breadcrumbs";
import Save from "./actions/Save";
import {trackExecuting} from "../funcs/track";

export const FormNetwork = ({children, methods, onGoBack, Executor, focused}) => {
  const {handleSubmit} = methods;
  const {onSave, message, toast} = useManageScript(SCHEME_AS.NET);

  const onSubmit =  async () => {
    if(!focused)return;

    toast("Saving...", 5 * 1000);

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
    //   .then(() => {
    //   const commands = methods.getValues("commands");
    //   const cacheScopes = methods.getValues("$$scopes");
    //
    //   new Scenario(commands)
    //     .onTrack(({id, status, message}) => {
    //       if (status === STATUS.PENDING) {
    //         methods.setValue(`errors.${id}`, {pending: true, message})
    //       } else if (status === STATUS.DONE) {
    //         methods.setValue(`errors.${id}`, {done: true, message})
    //       } else if (status === STATUS.FAIL) {
    //         methods.setValue(`errors.${id}`, {message})
    //       }
    //     })
    //     .execute(
    //     structuredClone(cacheScopes)
    //   )
    // })
  }

  useHotkeys('ctrl+s', onSubmit);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={'relative'}>
        <div className={'absolute right-0 beta overflow-hidden h-[70px] w-[70px] -mt-[14px]'}/>

        {process.env.NODE_ENV === "development" && <History/>}

        {children}
        <div
          className={'fixed top-[35px] py-0.5 bg-white dark:bg-[#383838] z-40 flex items-center w-full shadow-[0_0_6px_-1px_rgba(0,0,0,0.3)]'}>
          <Breadcrumbs onGoBack={onGoBack}/>

          <p className={'ml-4 text-primary'}>{message}</p>

          <div className={'ml-auto mr-4 inline-flex items-center'}>
            <FormHistory/>
            <Export hint={'Download the script as a scenario file'}/>
            <Save type={'submit'}/>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
