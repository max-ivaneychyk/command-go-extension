import {FormProvider} from "react-hook-form";
import {Scenario, STATUS} from "../classes/Scenario";
import {MdPlayArrow} from "react-icons/md";
import React from "react";
import {SCENARIO_EXECUTION_MODE, SCHEME_AS} from "../const/scheme";
import {useManageScript} from "../hooks/useManageList";
import Tooltip from "../components/Tooltip";
import History from "../components/History";
import {useHotkeys} from "react-hotkeys-hook";
import FormHistory from "./actions/FormHistory";
import Export from "./actions/Export";
import Breadcrumbs from "./actions/Breadcrumbs";
import Save from "./actions/Save";
import {hideLogger, initLogger} from "../commands/Log.run";


export const FormCommands = ({children, methods, onGoBack, Executor, debug = false, focused}) => {
  const {handleSubmit, watch} = methods;
  const {onSave, message, toast} = useManageScript(SCHEME_AS.COMMAND);
  const executionIn = watch("$$executionIn")

  const save = async () => {
    await onSave(methods);
  }

  const onSubmit = async () => {
    const isBackground =  SCENARIO_EXECUTION_MODE.BG === executionIn;

    toast("Running...", 5 * 1000);

    const commands = methods.getValues("commands");
    const cacheScopes = methods.getValues("$$scopes");
    const ClassRun = isBackground ? Scenario : Executor;

    methods.setValue("errors", {});
    methods.setValue("info", {});

    ClassRun.cleanUp();

    if(isBackground) {
      await import('../map.bg.run');

      if(debug) {
        await initLogger();
      } else {
        hideLogger();
      }
    }

    new ClassRun(commands, !isBackground ? {debug, reload: false} : undefined)
      .onTrack(({id, status, message}) => {
        if (status === STATUS.PENDING) {
          methods.setValue(`errors.${id}`, {pending: true, message})
          methods.setValue(`info.${id}.start`, Date.now())
        } else if (status === STATUS.DONE) {
          methods.setValue(`errors.${id}`, {done: true, message})
          methods.setValue(`info.${id}.end`, Date.now())
        } else if (status === STATUS.FAIL) {
          methods.setValue(`errors.${id}`, {message})
          methods.setValue(`info.${id}.end`, Date.now())
        }
      })
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
      <form onSubmit={handleSubmit(onSubmit)} className={'relative'}>
        {executionIn === SCENARIO_EXECUTION_MODE.BG && <div className={'absolute right-0 beta overflow-hidden h-[70px] w-[70px] -mt-2'}/>}
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
              hint={'Inject to current active page by manually click "Run"'}>
              <button
                type={'submit'}
                className="badge-green badge !ml-auto !inline-flex !items-center !pr-1.5">
                <MdPlayArrow className={'mr-1 inline w-5 h-5'}/>
                Run
              </button>
            </Tooltip>

          </div>
        </div>

      </form>
    </FormProvider>
  )
}
