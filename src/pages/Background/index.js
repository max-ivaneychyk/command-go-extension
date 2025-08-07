import Messenger from "../../chrome/services/MessengerBg";
import './injectContentScripts'
import "./openByClick"
import './onInstall'
import './alarms'
import './tabs'
import {API} from "../../app/classes/API";
import {IS_DEV} from "../../chrome/const/support";

if(IS_DEV)console.log("BG")

Messenger.registerHandlers({
  "BG:COMMAND": ({command, params}) => {
    const cmd = API[command];
    return cmd.exe(params);
  },
})
