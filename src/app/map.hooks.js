import AlarmTriggerHooks from "./triggers/Alarm.hooks";
import LoadScriptHooks from "./userScript.commands/LoadScript.hooks";
import NetRulesHooks from "./network.commands/NetRules.hooks";
import InjectCodeJSHooks from "./userScript.commands/InjectCodeJS.hooks";
import {TRIGGERS} from "./const/triggers";
import {USER_SCRIPT_COMMANDS} from "./commands/code/save";

const triggers = [
  [TRIGGERS.ALARM, AlarmTriggerHooks]
];

const commands = [
  ["NET_RULES", NetRulesHooks],
  [USER_SCRIPT_COMMANDS.LOAD_SCRIPT_BY_SRC, LoadScriptHooks],
  [USER_SCRIPT_COMMANDS.INJECT_INLINE_CODE, InjectCodeJSHooks],
]

export const hooksMap = new Map(
 triggers.concat(commands)
);
