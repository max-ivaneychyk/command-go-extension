import React from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import {getInitialScheme, useSelectFrom} from "../../hooks/useSelectFrom";
import run from "./OpenTab.run";
import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import LinkToDoc from "../../components/LinkToDoc";
import {TEXT} from "../../const/messages";
import {TbExternalLink} from "react-icons/tb";
import {COMMANDS} from "../../const/commands";
// import {SOURCE_TYPES} from "../../const/variables";

// const properties = {
//   optionally: {
//     active: {sources: [SOURCE_TYPES.BOOLEAN], label: "Active"},
//     pinned: {sources: [SOURCE_TYPES.BOOLEAN], label: "Pinned"},
//     index: {sources: [SOURCE_TYPES.NUMBER, SOURCE_TYPES.VARIABLE], label: "Index",},
//     openerTabId: {sources: [SOURCE_TYPES.NUMBER, SOURCE_TYPES.VARIABLE], label: "Opener Tab Id",},
//     insertBeforeTabId: {sources: [SOURCE_TYPES.NUMBER, SOURCE_TYPES.VARIABLE], label: "Insert Before Tab Id",},
//     windowId: {sources: [SOURCE_TYPES.NUMBER, SOURCE_TYPES.VARIABLE], label: "Window Id",},
//   }
// }

const scheme = {
  type: COMMANDS.OPEN_TAB,
  saveTo: "",
  value: getInitialScheme(), // variableName
//  optionally: {}
}

const Control = ({name}) => {
  const {jsx: href} = useSelectFrom({
    group: `${name}value`,
    placeholder: 'https://example.com'
  })
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text: ""})

  return (
    <>
      Open new tab from URL {href}
      <LinkToDoc
        href={'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/Tab'}>Tab</LinkToDoc>
      {TEXT.ASSIGN_TO}{saveToJsx}
    </>
  )
}


export const OpenNewTabCommand = {
  label: "Open Browser Tab",
  icon: <IconCommand Svg={TbExternalLink} className={ICON_COLOR.BLUE}/>,
  Control,
  run,
  scheme,
  group: "Browser API",
}

