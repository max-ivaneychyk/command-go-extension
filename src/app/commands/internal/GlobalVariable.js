import {SCENARIO_EXECUTION_MODE, SCHEME_AS} from "../../const/scheme";
import run from "./GlobalVariable.run";
import {COMMANDS} from "../../const/commands";

const scheme = {
  type: COMMANDS.INIT_GLOBAL_VARIABLE
}

const Control = () => {
  return null
};

export const InitGlobalVariableCommand = {
  icon: null,
  Control,
  run,
  scheme,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  as: SCHEME_AS.HIDDEN,
  label: "Init global variables",
  group: ""
}

