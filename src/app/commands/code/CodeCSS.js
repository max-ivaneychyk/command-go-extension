import {useFormContext} from "react-hook-form";
import {useCollapse} from "../../hooks/useCollapse";
import Editor, {LANG} from "../../components/Editor";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import CssIcon from "../../icons/css";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import run from './CodeCSS.run'
import {COMMANDS} from "../../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../../const/scheme";


const scheme = {
  type: COMMANDS.CSS,
  immediately: true,
  name: " Red Background",
  value: `/* First css rule  */
  body { background: red !important }`,
}


const options = [
  {name: 'immediately in background', id: true},
  {name: 'with script', id: false},
]

const Control = ({name, isPortal}) => {
  const {setValue, getValues} = useFormContext();
  const collapse = useCollapse();

  function handleEditorChange(value) {
    setValue(`${name}value`, value, {
      shouldDirty: true,
      shouldTouch: true
    });
  }

  return (
    <>
      {collapse.control}
      Apply CSS <Input name={`${name}name`}/>
      <Dropdown
        options={options}
        label={''}
        name={`${name}immediately`}
      />
      {collapse.render(
        <Editor
          isPortal={isPortal}
          lang={LANG.CSS}
          value={getValues(`${name}value`)}
          onChange={handleEditorChange}
          visible={collapse.visible}
        />
      )}
    </>
  )
}


export const CSSCodeCommand = {
  icon: <IconCommand Svg={CssIcon} className={ICON_COLOR.GREY}/>,
  Control,
  run,
  scheme,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  group: "Styles",
  label: "Apply CSS",
}


