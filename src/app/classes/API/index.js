import Notifications from "./Notifications";
import OpenNewTab from "./OpenNewTab";
import DBGet from "./DBGet";
import DBGetKeys from "./DBGetKeys";
import DBGetEntries from "./DBGetEntries";
import DBGetValues from "./DBGetValues";
import DBSet from "./DBSet";
import DBRemove from "./DBRemove";
import Fetch from "./Fetch";
import UserScript from "./UserScript";
import GetAllTabs from "./GetAllTabs";
import TTSSpeak from "./TTSSpeak";
// import set from "lodash/set";


export const API = {
  // Browser APIs
  [Notifications.key]: Notifications,
  [OpenNewTab.key]: OpenNewTab,
  [GetAllTabs.key]: GetAllTabs,
  [TTSSpeak.key]: TTSSpeak,
  // IndexedDB
  [DBGet.key]: DBGet,
  [DBGetKeys.key]: DBGetKeys,
  [DBGetEntries.key]: DBGetEntries,
  [DBGetValues.key]: DBGetValues,
  [DBSet.key]: DBSet,
  [DBRemove.key]: DBRemove,
  // Network
  [Fetch.key]: Fetch,
  // Scripts
  [UserScript.key]: UserScript,
}

// const functions = {};
//
// Object.entries(API).forEach(([key, command]) => {
//   set(functions, key, command);
// })
//
//
// const CommandGo = {
//   Commands: functions,
//   run: function(command, params) {
//
//   }
// }
//
// console.log(CommandGo);
//
// export default CommandGo;
