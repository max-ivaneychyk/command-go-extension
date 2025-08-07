import {DEFAULT_SCOPE, ScopeCtx} from "../scope";
import {useContext, useMemo} from "react";
import {useFormContext, useWatch} from "react-hook-form";
import {READ_ONLY_VARS} from "../const/readOnlyVars";

export const useScopedVariables = () => {
  const scopeName = useContext(ScopeCtx);
  const {setValue, getValues} = useFormContext();
  const localScopes = useWatch({
    name: "$$scopes"
  })

  const scopes = useMemo(() => {
    return {
      ...localScopes,
      $$global: {
        ...localScopes.$$global,
        ...READ_ONLY_VARS,
      }
    }
  }, [localScopes])

  const setScope = (callback) => {
    setValue("$$scopes", callback(getValues().$$scopes))
  }

  const {map: availableVariables, var2Scope: meta} = useMemo(() => {
    let localScope = scopes[scopeName] || {};
    const listOfScopes = [];
    let __scopeName = scopeName;
    let var2Scope = {};

    while (true) {
      const {$$ref, ...params} = localScope;

      listOfScopes.push(params)

      Object.keys(params).forEach((key) => {
        if(!var2Scope[key]) {
          var2Scope[key] = __scopeName;
        }
      })

      if (!$$ref)break; // it is global scope

      localScope = scopes[$$ref];
      __scopeName = $$ref;
    }

    return {map: Object.assign({}, ...listOfScopes.reverse()), var2Scope}
  }, [scopeName, scopes]);

  const onSet = (variable, parent = 0) => {
    setScope(scopes => {
      const scopeKey = !parent ? scopeName : scopes[scopeName].$$ref;

      return {
        ...scopes,
        [scopeKey]: {
          ...scopes[scopeKey],
          [variable]: variable
        }
      }
    })
  }

  const onClear = (scopeKey, variable) => {
    setScope(scopes => {
      const {[variable]: _, ...nested} = scopes[scopeKey];
      return {
        ...scopes,
        [scopeKey]: nested
      }
    })
  }

  return [availableVariables, meta, onSet, onClear]
}

export const useVariables = () => {
  const [vars, meta, setVars, onClear] = useScopedVariables();

  return {
    map: vars,
    meta,
    variables: Object.entries(vars).map(([name, id]) => ({
      name,
      id,
      global: meta[id] === DEFAULT_SCOPE
    })),
    onClear: (variable) => onClear(meta[variable], variable),
    setVariables: setVars
  }
}

// '  #{$1}'
