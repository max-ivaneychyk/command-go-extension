import ViewCommands from "./views/Commands";
import ViewScripts from "./views/Scripts";
import React, {useContext, useState} from "react";
import useWindowWidth from "./hooks/useWindowWidth";
import {SCHEME_AS, UI_TABS} from "./const/scheme";
import {useSwitchTheme} from "./hooks/useSwitchTheme";
import Tabs, {Tab} from "./components/Tabs";
import NotificationMessage from "./components/NotificationMessage";
import ListOfCommands from "./containers/ListOfCommands";
import ListOfScripts from "./containers/ListOfScripts";
import ListOfNetwork from "./containers/ListOfNetwork";
import Permissions from "./containers/Permissions";
import Network from "./views/Network";
import {NotificationsCtx, withNotifications} from "./ctx/notifications";
import {useIsChromeDevMode} from "./hooks/useIsChromeDevMode";
import LinkToDoc from "./components/LinkToDoc";
import {latestVersion} from "./migrations";
import {BROWSER} from "../chrome/const/support";
import {withPermissions} from "./ctx/permissions";


function App({Executor, href, name}) {
  const {notifications} = useContext(NotificationsCtx)

  const [scenarios, setScenarios] = useState(null);
  const [scripts, setScripts] = useState(null);
  const [network, setNetworkScripts] = useState(null);
//
  const [viewMode, setMode] = useState(SCHEME_AS.COMMAND);
  const width = useWindowWidth()
  const {jsx} = useSwitchTheme()
  const isDevMode = useIsChromeDevMode();

  const tabs = [
    {
      id: SCHEME_AS.COMMAND,
      hook: [scenarios, setScenarios],
      List: ListOfCommands,
      View: ViewCommands,
    },
    {
      id: SCHEME_AS.USER_SCRIPT,
      hook: [scripts, setScripts],
      List: ListOfScripts,
      View: ViewScripts,
    },
    {
      id: SCHEME_AS.NET,
      hook: [network, setNetworkScripts],
      List: ListOfNetwork,
      View: Network,
    },
    {
      id: 'permissions',
      hook: [],
      List: Permissions,
      View: () => null,
    }
  ].filter(({id}) => {
    // USER_SCRIPT is not supported and net is not tested
    return !(BROWSER === 'firefox' && [SCHEME_AS.USER_SCRIPT, SCHEME_AS.NET].includes(id));
  })

  const isSmall =  width < 600;

  return (
    <div>

        <div className={'fixed pt-1 top-0 w-full left-0 z-40 bg-body-layout flex flex-wrap'}>
          {!isSmall && <p className={'pl-1 mt-3'}>App v{latestVersion}</p>}
          <div className={'relative pl-1 pt-0.5 flex items-center'}>
            <Tabs>
              {
                tabs.map((item) => {
                  return (
                    <Tab
                      key={item.id}
                      active={viewMode === item.id}
                      onClick={() => setMode(item.id)}
                      className={'min-w-[96px]'}>
                      {UI_TABS[item.id]}
                    </Tab>
                  )
                })
              }
            </Tabs>
          </div>

          <div className={'ml-auto pr-3 flex items-center'}>
            {!isSmall && jsx}
          </div>
        </div>
        <div className={'mt-16 pt-2'}/>
        {
          isSmall && <NotificationMessage>
            The side panel is too narrow. Please resize it for an optimal viewing experience.
          </NotificationMessage>
        }
        {
          !isDevMode &&
          viewMode === SCHEME_AS.USER_SCRIPT &&
          <NotificationMessage className={'mt-6'}>
            By default, the browser prevents users from running scripts. To enable this feature, please follow the
            instruction by the link .
            <LinkToDoc
              href={'https://developer.chrome.com/docs/extensions/reference/api/userScripts#developer_mode_for_extension_users'}>
              Link
            </LinkToDoc>
          </NotificationMessage>
        }
        {
          notifications.map((props, index) => {
            return (
              <NotificationMessage {...props} key={index}/>
            )
          })
        }
        {
          tabs.map((item) => {
            const isFocused = item.id === viewMode;
            const {List, hook, View} = item;
            const [values, setValues] = hook;
            const clear = () => setValues(null)

            return (
              <div
                key={item.id}
                style={{display: isFocused ? "" : "none"}}>
                {
                  values ?
                    <View
                      focused={isFocused}
                      Executor={Executor}
                      values={values}
                      onGoBack={clear}
                    /> :
                    <List
                      focused={isFocused}
                      onSelect={setValues}
                      href={href}
                    />
                }
              </div>
            )
          })
        }
    </div>
  )
}


export default withNotifications(withPermissions(App))
