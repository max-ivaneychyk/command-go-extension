import Input from "../components/Input";
import {useFormContext} from "react-hook-form";
import {useCollapse} from "../hooks/useCollapse";
import Editor, {LANG} from "../components/Editor";
import React, {useEffect} from 'react';
import IconCommand, {ICON_COLOR} from "../components/IconCommand";
import {SCHEME_AS} from "../const/scheme";
import {SCRIPT_RUN_AT, SCRIPT_WORLDS} from "../const/userScript";
import {FaCss3, FaJs} from "react-icons/fa";
import {USER_SCRIPT_COMMANDS} from "../commands/code/save";
import hooks from './InjectCodeJS.hooks'
import Hint from "../components/InfoHint";
import LinkToDoc from "../components/LinkToDoc";
import Dropdown from "../components/Dropdown";

const scheme = {
  type: USER_SCRIPT_COMMANDS.INJECT_INLINE_CODE,
  code: `console.log("READY")`,
  $$formId: "",
  world: SCRIPT_WORLDS[0].id,
  runAt: SCRIPT_RUN_AT[0].id,
  lang: undefined, // default js
  matches: ["*://example.com/*"]
}

const languages = [
  // {name: "Html", id: LANG.HTML},
  // {name: "JSON", id: LANG.JSON},
  {name: "JS", id: undefined},
  {name: "CSS", id: LANG.CSS},
]

const run = () => null;

const Control = ({name, isPortal}) => {
  const {setValue, getValues, watch} = useFormContext();
  const value = getValues(`${name}code`)
  const collapse = useCollapse();
  const lang = watch(`${name}lang`) ?? LANG.JS;

  function handleEditorChange(value, event) {
    setValue(`${name}code`, value, {
      shouldDirty: true,
      shouldTouch: true
    })
  }

  useEffect(() => {
    setValue(`${name}$$formId`, getValues().$$uuid)
  }, [getValues, name, setValue]);

  return (
    <>
      {collapse.control}
      Inject code
      <Dropdown
        options={languages}
        label={''}
        name={`${name}lang`}
      />
      to matches
      <Input
        name={`${name}matches.0`}
      />

      <Hint hint={
        <>More info about matches <LinkToDoc
          href={'https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns'}> here</LinkToDoc>
        </>
      }
      />
      {/*execution world: <Dropdown options={worlds} name={`${name}world`}/>*/}
      {collapse.render(
        <Editor
          isPortal={isPortal}
          key={"format"}
          lang={lang}
          value={value}
          visible={collapse.visible}
          onChange={handleEditorChange}
        />
      )}
    </>
  )
}


export const InjectJSCodeCommand = {
  icon: <IconCommand Svg={FaJs}/>,
  Control,
  run,
  scheme,
  hooks,
  as: SCHEME_AS.USER_SCRIPT,
  label: "Inject JS Code",
}


