export const SCHEME_KEYS = {
  SANDBOX: "$$sandbox",
  SCOPED: "$$scope",
  BG_MODE: "$$bg",
}

export const EARLY_RETURN_KEYWORD = '$RETURN';

export const SCENARIO_EXECUTION_MODE = {
  CONTENT: "content",
  UNKNOWN: "unknown",
  BG: "background",
}

export const SCHEME_AS = {
  COMMAND: "COMMAND",
  NET: "NETWORK",
  USER_SCRIPT: "USER_SCRIPT",
  ALARMS: "ALARMS",
  HIDDEN: 'HIDDEN'
}

export const UI_TABS = {
  [SCHEME_AS.COMMAND]: "Scenarios",
  [SCHEME_AS.USER_SCRIPT]: "Scripts",
  [SCHEME_AS.NET]:"Override Headers",
  [SCHEME_AS.ALARMS]:"Alarms",
  ['permissions']:"Permissions",
}

export const MESSAGES = {
  DELETE: {
    [SCHEME_AS.USER_SCRIPT]: "Are you sure you want to delete the userScript?",
    [SCHEME_AS.COMMAND]: "Are you sure you want to delete the scenario?",
    [SCHEME_AS.NET]: "Are you sure you want to delete the network scheme?",
    [SCHEME_AS.ALARMS]: "Are you sure you want to delete the alarm scheme?",
  },
  RENAME: {
    [SCHEME_AS.USER_SCRIPT]: "Rename the userScript",
    [SCHEME_AS.COMMAND]: "Rename the scenario",
    [SCHEME_AS.NET]: "Rename the net",
    [SCHEME_AS.ALARMS]: "Rename the alarm",
  },
  CREATE: {
    [SCHEME_AS.USER_SCRIPT]: "Add name of script",
    [SCHEME_AS.COMMAND]: "Add name of scenario",
    [SCHEME_AS.NET]: "Add name of net schema",
    [SCHEME_AS.ALARMS]: "Add name of alarm schema",
  },
}
