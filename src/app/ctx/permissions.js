import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {infoStyles} from "../components/NotificationMessage";
import {browser} from "../../chrome/const/extension";
import {NotificationsCtx} from "./notifications";
import {walkNestedJson} from "../funcs/walkNestedJson";
import {permissionsMap} from "../map.permissions";


export const PermissionsCtx = createContext({permissions: {}});

export const withPermissions = (Component) => (props) => {
  const [permissions, setPermissions] = useState(() => {
    return chrome.runtime.getManifest().optional_permissions.reduce((acc, currentValue) => {
      acc[currentValue] = false;
      return acc;
    }, {})
  });
  const {actions} = useContext(NotificationsCtx);

  console.log({permissions});

  const extractSchemePermissions = useCallback((scheme) => {
    const usedPermissions = new Set();

    walkNestedJson(scheme.commands, (value) => {
      const type = value?.type

      if (!type) return;

      const permission = permissionsMap.get(type);

      if (!permission) return;

      usedPermissions.add(permission);
    })

    return [...usedPermissions];
  }, [])

  const checkPermission = useCallback(permission => {
    if (permissions[permission] !== undefined) {
      return Promise.resolve(permissions[permission]);
    }
    return browser.permissions.contains({permissions: [permission]})
  }, [permissions])

  const request = useCallback((permission) => {
    return browser.permissions.request({permissions: [permission]})
  }, [])

  const remove = useCallback((permission) => {
    return browser.permissions.remove({permissions: [permission]})
  }, [])

  const validatePermissions = useCallback((permission) => {
    checkPermission(permission).then(isAllowed => {
      if (isAllowed) return;

      const close = actions.append({
        id: permission,
        children: (
          <div>
            Your scheme requires  "{permission}" permission
            <br/>

            <button
              className="badge-green badge"
              onClick={() => {
                request(permission)
                  .then((isAllowed) => {
                    if (!isAllowed) return;
                    close();
                  })
              }}
            >
              Allow
            </button>

            <button
              className="badge-grey badge"
              onClick={() => close()}>
              Disallow
            </button>
          </div>
        ),
        allowClear: true,
        pallet: infoStyles
      })

    })
  }, [actions, checkPermission, request]);

  useEffect(() => {
    const patchState = bool => permission => {
      const obj = (permission.permissions ?? []).reduce((acc, cur) => {
        acc[cur] = bool;

        return acc;
      }, {});

      setPermissions(prev => ({...prev, ...obj}));
    };

    chrome.permissions.getAll().then(patchState(true))
    chrome.permissions.onAdded.addListener(patchState(true))
    chrome.permissions.onRemoved.addListener(patchState(false))
  }, [])

  const functions = useMemo(() => {
    return {
      extractSchemePermissions,
      validatePermissions,
      request,
      remove
    }
  }, [extractSchemePermissions, remove, request, validatePermissions]);

  return (
    <PermissionsCtx.Provider value={{actions: functions, permissions}}>
      <Component {...props}/>
    </PermissionsCtx.Provider>)
};
