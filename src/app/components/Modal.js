import {Button, Input, Modal} from "rsuite";
import React, {useState} from 'react'
import Toggle from "./Toggle";
import {IoAddSharp} from "react-icons/io5";
import {SCENARIO_EXECUTION_MODE} from "../const/scheme";
import {useHotkeys} from "react-hotkeys-hook";


export const Dialog = ({open, onClose, onApply, placeholder, children = () => null}) => {
  const [{name, mode}, set] = useState({name: "", mode: SCENARIO_EXECUTION_MODE.CONTENT});

  const close = () => {
    set({name: "", mode: SCENARIO_EXECUTION_MODE.CONTENT});
    onClose();
  }

  const create = () => {
    onApply({name, mode});
    close();
  }

  useHotkeys('enter', () => {
    if (open && name.trim().length) create();
  }, {enableOnFormTags: true});

  return (
    <Modal backdrop keyboard open={open} onClose={close}>
      <Modal.Body>
        <Input
          autoFocus
          maxLength={40}
          className={'mb-3'}
          placeholder={placeholder}
          onChange={text => {
            set({mode, name: text.toString()})
          }}
        />
        {children({name, mode, set})}
      </Modal.Body>
      <Modal.Footer>
        <Button
          type={'button'}
          onClick={create}
          className={`!inline-flex items-center  px-0.5 text-default leading-default badge badge-blue`}>
          <IoAddSharp className={'inline w-3.5 h-3.5'}/> Create
        </Button>
        <Button
          type={'button'}
          onClick={close}
          className={`!inline-flex items-center px-0.5 text-default leading-default badge badge-grey`}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const DialogCreate = ({open, onClose, onApply, short = false, title}) => {
  return (
    <Dialog open={open} onClose={onClose} onApply={onApply} placeholder={title}>
      {
        ({mode, set}) => !short && <div>
          <div className={'flex items-center'}>
            Execution mode:
            <p
              className={SCENARIO_EXECUTION_MODE.CONTENT === mode ? 'badge badge-blue select-none' : "badge badge-grey"}>
              Content Page
            </p>
            <Toggle
              onToggle={() => {
                set(prev => ({
                  ...prev,
                  mode: SCENARIO_EXECUTION_MODE.CONTENT === mode ? SCENARIO_EXECUTION_MODE.BG : SCENARIO_EXECUTION_MODE.CONTENT
                }))
              }}
            />
            <p
              className={SCENARIO_EXECUTION_MODE.BG === mode ? 'badge badge-blue select-none' : "badge badge-grey"}>
              Background
            </p>
          </div>
          <p className={'text-xs text-gray-500 dark:text-gray-400 mt-1'}>
            {SCENARIO_EXECUTION_MODE.CONTENT === mode
              ? 'Runs on the active webpage — use this for DOM interactions, clicking, scraping, and page automation.'
              : 'Runs in the extension background — use this for tab management, alarms, or Chrome API calls.'}
          </p>
        </div>
      }
    </Dialog>
  )
}

export default DialogCreate
