import React, {useCallback} from "react";
import List from "./List";
import {getInitialScheme} from "../funcs/getInitialScheme";
import {useManageList} from "../hooks/useManageList";
import {SCHEME_AS} from "../const/scheme";


const ListOfCommands = ({href, onSelect, focused}) => {
  const getInitial = useCallback(({name, schema, mode}) => {
    return getInitialScheme({
      href,
      schema,
      name,
      mode
    });
  }, [href]);

  const {
    items,
    onCreate, onDelete, onImport, onRename, onDeleteMany, onMakeCopy
  } = useManageList(SCHEME_AS.COMMAND, {
    focused,
    onSelect, getInitial
  })

  return (
    <List
      items={items}
      onSelect={(item) => {
        onSelect(item ?? null)
      }}
      onDelete={onDelete}
      onRename={onRename}
      onMakeCopy={onMakeCopy}
      onCreate={onCreate}
      onImport={onImport}
      onDeleteMany={onDeleteMany}
      schema={SCHEME_AS.COMMAND}
    />
  );
}

export default ListOfCommands
