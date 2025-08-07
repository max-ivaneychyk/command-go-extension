import React, { useContext, useEffect, useState } from 'react';
import Command from '../components/Command';
import { browser } from '../../chrome/const/extension';
import { PermissionsCtx } from '../ctx/permissions';
import Toggle from '../components/Toggle';

const desc = {
  windows: 'Allows managing and interacting with browser windows.',
  tabs: 'Grants access to browser tabs, including querying and modifying them.',
  tts: 'Enables text-to-speech functionality within the extension.',
  alarms: 'Allows scheduling code execution at specific times or intervals.',
  scripting:
    'Permits script injection into web pages for modification or automation.',
  userScripts:
    'Enables running user-defined scripts with controlled execution.',
  webNavigation: 'Provides details about browser navigation events.',
  sidePanel: "Grants control over the browser's side panel.",
  declarativeNetRequest:
    'Allows modifying network requests without persistent listeners.',
  unlimitedStorage:
    'Permits storing an unlimited amount of data using storage APIs.',
  notifications: 'Enables displaying system notifications to the user.',
  webRequest: 'Allows observing and modifying network requests in real-time.',
  webRequestBlocking:
    'Enables blocking or modifying network requests before they complete.',
};

const Permissions = () => {
  const [state, setState] = useState({
    permissions: [],
    optional_permissions: [],
  });
  const {
    permissions: mapPermissions,
    actions: { request, remove },
  } = useContext(PermissionsCtx);

  useEffect(() => {
    const { optional_permissions, permissions } = browser.runtime.getManifest();

    setState({
      permissions,
      optional_permissions,
    });
  }, []);

  return (
    <div className={'m-3'}>
      <h1 className={'text-lg h2'}>
        Some commands require permissions. Ensure all used commands have the
        required ones.
      </h1>
      {state.permissions
        .concat(state.optional_permissions)
        .map((permission, index) => {
          const required = index <= state.permissions.length - 1;
          const enabled = mapPermissions[permission];

          const onClick = () => {
            if (enabled) remove(permission);
            else request(permission);
          };

          return (
            <Command key={permission} className={`mb-3 flex !pr-1 border align-baseline`}>
              <Toggle
                enabled={required || enabled}
                disabled={required}
                onToggle={required ? undefined : onClick}
              />
              <button
                className={
                  'badge-blue !pl-2 rounded-md !border-transparent !bg-transparent inline'
                }
              >
                {permission}
              </button>
              <span className={'text-[14px] leading-5 font-medium ml-2'}> - {desc[permission]}</span>
            </Command>
          );
        })}
    </div>
  );
};

export default Permissions;
