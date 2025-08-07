import React, {useCallback} from "react";
import List from "./List";
import {getInitialScheme} from "../funcs/getInitialScheme";
import {useManageList} from "../hooks/useManageList";
import {SCHEME_AS} from "../const/scheme";

const ListOfNetwork = ({href, onSelect, focused}) => {

  const getInitial = useCallback(({
                                    name,
                                    schema,
                                  }) => {
    return getInitialScheme({
      href,
      schema,
      name
    })

  }, [href]);

  const {
    items,
    onCreate, onDelete, onImport, onRename, onDeleteMany
  } = useManageList(SCHEME_AS.NET, {
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
      onCreate={onCreate}
      onImport={onImport}
      onDeleteMany={onDeleteMany}
      schema={SCHEME_AS.NET}
    />
  );
}

export default ListOfNetwork
