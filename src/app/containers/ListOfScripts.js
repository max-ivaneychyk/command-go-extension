import React, {useCallback} from "react";
import List from "./List";
import {getInitialScheme} from "../funcs/getInitialScheme";
import {useManageList} from "../hooks/useManageList";
import {SCHEME_AS} from "../const/scheme";

const ListOfScripts = ({href, onSelect, focused}) => {
  const getInitial = useCallback(({name, schema}) => {
    return getInitialScheme({
      href,
      name,
      schema
    })
  }, [href]);

  const {
    items,
    onCreate, onDelete, onImport, onRename, onDeleteMany
  } = useManageList(SCHEME_AS.USER_SCRIPT, {
    onSelect, getInitial, focused
  })

  return (
    <List
      items={items}
      onSelect={(item) => {
        onSelect(item ?? null)
      }}
      onDelete={onDelete}
      onRename={onRename}
      onCreate={onCreate}
      onImport={onImport}
      onDeleteMany={onDeleteMany}
      schema={SCHEME_AS.USER_SCRIPT}
    />
  );
}

export default ListOfScripts
