import {SCENARIO_EXECUTION_MODE, SCHEME_AS} from "../const/scheme";

export const migrateToV2 = async scene => {
    const scripts = scene.$$userScripts;

    // Patch to next version
    scene.$$userScripts = undefined;
    scene.$$version = "2.0.0"
    scene.$$executionIn = SCENARIO_EXECUTION_MODE.CONTENT;
    scene.$$updatedAt = Date.now();
    scene.$$schema = SCHEME_AS.COMMAND;

    // no user scripts
    if (!scripts?.length) return [scene];

    const script = {
      ...scene,
      $$schema: SCHEME_AS.USER_SCRIPT,
      $$executionIn: SCENARIO_EXECUTION_MODE.UNKNOWN,
      $$userScripts: undefined,
      commands: scripts
    }

    return [scene, script];
}
