import React, {createContext, useMemo, useState} from "react";
import {nanoid} from "nanoid";


export const NotificationsCtx = createContext({notifications: []});


export const withNotifications = (Component) => (props) => {
  const [notifications, setNotifications] = useState([]);

  const actions = useMemo(() => {
    return {
      append: (notification) => {
        const id = notification.id || nanoid();
        setNotifications(prev => [...prev.filter(i => i.id !== id), {...notification, id}]);
        return () => {
          setNotifications(prev => prev.filter(n => n.id !== id));
        }
      },
      remove: id => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }
    }
  }, [])

  return (
    <NotificationsCtx.Provider value={{actions, notifications}}>
      <Component {...props}/>
    </NotificationsCtx.Provider>)
};
