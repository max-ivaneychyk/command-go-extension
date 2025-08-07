import AceEditor from "react-ace";
import {useEffect, useMemo, useRef} from "react";
import React from 'react';
import "../commands/code/ace"
import ace from "ace-builds/src-noconflict/ace"
import {nanoid} from "nanoid";
import {useDebounce} from "use-debounce";
import {useIncreaseHistoryVersion} from "../hooks/useIncreseHistoryVersion";

ace.config.set('loadWorkerFromBlob', false);

export const LANG = {
  JS: 'javascript',
  CSS: 'css',
  HTML: 'html',
  JSON: 'json',
}


const Editor = ({onChange, lang = LANG.JS, value, visible, isPortal}) => {
  const id = useMemo(() => 'id_'+nanoid(), []);
  const key = useDebounce(visible, 400);
  const updateVersion = useIncreaseHistoryVersion();
  const refChanges = useRef(false)

  return (
    <AceEditor
      style={{
        width: "100%",
        height: isPortal ? "calc(100vh - 94px)" : "280px"
      }}
      mode={lang}
      theme="dracula"
      value={value}
      onFocus={() => {
        refChanges.current = false;
      }}
      onChange={props => {
        refChanges.current = true;
        return onChange(props);
      }}
      onBlur={() => {
        if(refChanges.current)updateVersion();
      }}
      enableBasicAutocompletion
      enableLiveAutocompletion
      name={id}
      tabSize={2}
      enableSnippets
      highlightActiveLine
      key={key}
      editorProps={{
        $blockScrolling: true,
        $useWorker: false,
      }}
    />)
}

export default Editor
