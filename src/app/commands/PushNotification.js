import React from 'react';
import IconCommand, {ICON_COLOR} from "../components/IconCommand";
import {getInitialScheme, useSelectFrom} from "../hooks/useSelectFrom";
import { MdNotifications } from "react-icons/md";
import run from "./PushNotification.run";
import {COMMANDS} from "../const/commands";

const scheme = {
  type: COMMANDS.PUSH_NOTIFICATION,
  value: getInitialScheme(), // variableName
  title: getInitialScheme(), // variableName
  icon: ``, // variableName
}

const Control = ({name}) => {
  const {jsx: message} = useSelectFrom({
    group: `${name}value`,
  })

  const {jsx: title} = useSelectFrom({
    group: `${name}title`,
  })

  return (
    <>
      Show Push Notification: title - {title} and message -
      {message}
      {/*and icon - {icon}*/}
    </>
  )
}


export const PushNotificationCommand = {
  icon:  <IconCommand Svg={MdNotifications} className={ICON_COLOR.GREY}/>,
  Control,
  run,
  scheme,
  permissions: "notifications",
  label: "Push Notification"
}

