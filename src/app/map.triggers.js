import {URLLoadTabTrigger} from "./triggers/LoadPage";
import {URLLoadIframeTrigger} from "./triggers/LoadIframe";
import {AlarmTrigger} from "./triggers/Alarm";
import {BrowserTabTriggers} from "./triggers/Tabs";
// import {BrowserPushNotificationsTriggers} from "./triggers/Notifications";

const triggers = [
  URLLoadTabTrigger,
  URLLoadIframeTrigger,
  AlarmTrigger,
  ...BrowserTabTriggers,
  // ...BrowserPushNotificationsTriggers
  // URLLoadRegExpTrigger,
];

const mapTrigger = (trigger) => {
  trigger.hidden = trigger.hidden || false;

  return [
    trigger.scheme.type,
    trigger
  ]
};

export const triggersMap = new Map(
  triggers.map(mapTrigger)
);


