import {useFormContext} from "react-hook-form";
import {useCollapse} from "../../hooks/useCollapse";
import Editor, {LANG} from "../../components/Editor";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import Input from "../../components/Input";
import {TEXT} from "../../const/messages";
import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import run from './Template.run'
import {COMMANDS} from "../../const/commands";
import Dropdown from "../../components/Dropdown";

const scheme = {
  type: COMMANDS.TEMPLATE,
  name: "My custom template",
  value: `<p>Html template</p>`,
  saveTo: "$temp",
  lang: LANG.HTML
}

const languages = [
  {name: "Html", id: LANG.HTML},
  {name: "JSON", id: LANG.JSON},
  {name: "JS", id: LANG.JS},
  {name: "CSS", id: LANG.CSS},
]

const Control = ({name, isPortal}) => {
  const {setValue, getValues, watch} = useFormContext();
  const lang = watch(`${name}lang`);
  const collapse = useCollapse();
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text: ""})

  function handleEditorChange(value) {
    setValue(`${name}value`, value, {
      shouldDirty: true,
      shouldTouch: true
    });
  }

  return (
    <>
      {collapse.control}
      <Dropdown
        options={languages}
        label={''}
        name={`${name}lang`}
      /> template <Input name={`${name}name`}/>
      {TEXT.ASSIGN_TO}{saveToJsx}
      {collapse.render(
        <Editor
          isPortal={isPortal}
          lang={lang}
          value={getValues(`${name}value`)}
          onChange={handleEditorChange}
          visible={collapse.visible}
        />
      )}
    </>
  )
}


export const TemplateCommand = {
  icon: <IconCommand Svg={"</>"} className={ICON_COLOR.GREY}/>,
  Control,
  run,
  scheme,
  label: "Template",
}


