import Input from "../../components/Input";
import {useFormContext} from "react-hook-form";
import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import {useCollapse} from "../../hooks/useCollapse";
import {Args} from "../../components/Args";
import Editor from "../../components/Editor";
import React from 'react';
import {SCENARIO_EXECUTION_MODE, SCHEME_KEYS} from "../../const/scheme";
import IconCommand from "../../components/IconCommand";
import {TEXT} from "../../const/messages";
import { FaJs } from "react-icons/fa";
import run from './CodeJS.run'
import {COMMANDS} from "../../const/commands";
import CommandInfo from "../../components/CommandInfo";

const scheme = {
  type: COMMANDS.CODE,
  saveTo: "",
  func: 'short description of block',
  arguments: [],
  [SCHEME_KEYS.SANDBOX]: true,
  value: `/* Name of function (and arguments) should match with a defined one in command */
const main = () => {
  return 1
}`,
}

const Control = ({name, isPortal}) => {
  const {setValue, watch, getValues} = useFormContext();
  const format = watch(`${name}format`)
  const value = getValues(`${name}value`)
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text: ""})

  const collapse = useCollapse();

  function handleEditorChange(value, event) {
    setValue(`${name}value`, value, {
      shouldDirty: true,
      shouldTouch: true
    });
  }

  return (
    <>
      <CommandInfo>
        Run JavaScript in an isolated sandbox <br/>
        -- Define a <span className={'badge badge-blue'}>main()</span> function that returns a value <br/>
        -- Pass data via arguments from variables <br/>
        -- Runs on the page but isolated from page scripts <br/>
        -- Result is saved to the assigned variable
      </CommandInfo>
      {collapse.control}

      <div className={'badge badge-pink mr-2'}>Isolated</div>
      Call function <span className={'badge badge-indigo'}>main</span>
     <Args prefixName={name}/> with label <Input
      name={`${name}func`}
    />
      {TEXT.ASSIGN_TO}{saveToJsx}

      {collapse.render(
        <Editor
          isPortal={isPortal}
          key={format}
          lang={'javascript'}
          value={value}
          visible={collapse.visible}
          onChange={handleEditorChange}
        />
      )}
    </>
  )
}


export const InjectCodeCommand = {
  icon: <IconCommand Svg={FaJs}/>,
  Control,
  run,
  scheme,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  label: "Call JS Function (Page Isolated)",
  group: "Inline Code",
}


