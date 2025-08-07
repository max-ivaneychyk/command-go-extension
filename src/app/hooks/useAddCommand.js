import {useContext} from "react";
import {ScopeCtx} from "../scope";
import {nanoid} from "nanoid";
import {useFormContext} from "react-hook-form";
import {controlsMap} from "../map.controls";
import {walkNestedJson} from "../funcs/walkNestedJson";
import {Scenario} from "../classes/Scenario";

export const useAddCommand = () => {
  const scopeName = useContext(ScopeCtx)
  const {getValues, setValue} = useFormContext()

  const setScopes = (callback) => {
    setValue("$$scopes", callback(getValues().$$scopes))
  }


  const getCopy = (command) => {
    const $$scopes = getValues("$$scopes")
    const cloned = structuredClone(command);
    const aliasOfRefs = new Map();
    const newScopes = {};

    cloned.$id = nanoid();
    aliasOfRefs.set(Scenario.getInstrScopeName(command), Scenario.getInstrScopeName(cloned));

    walkNestedJson(cloned.commands ?? [], (value) => {
      const id = value?.$id

      if (!id) return;

      value.$id = nanoid();
      aliasOfRefs.set(Scenario.getInstrScopeName({$id: id}), Scenario.getInstrScopeName(value));
    })

    aliasOfRefs.forEach((value, key) => {
      const prevScope = $$scopes[key] ?? {};

      newScopes[value] = {
        ...prevScope,
        $$ref: aliasOfRefs.get(prevScope.$$ref) ?? prevScope.$$ref,
        // __key: key,
        // __from: prevScope
      };
    })
    // console.log({$$scopes, newScopes});

    setScopes((prev) => {
      return {
        ...prev,
        ...newScopes
      }
    })

    return cloned;
  }

  const prepareOneCommand = (key) => {
    const $id = nanoid();

    setScopes((prev) => {
      return {
        ...prev,
        [`$$scope:${$id}`]: {
          $$ref: scopeName
        }
      }
    })

    return ({
      ...controlsMap.get(key).scheme,
      $id
    })
  }

  return {
    getCopy,
    prepareOneCommand
  }
}
