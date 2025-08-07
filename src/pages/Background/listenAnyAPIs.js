import {getAllResources} from "./triggers";
import {Scenario, STATUS} from "../../app/classes/Scenario";
import {triggersMapOfScenarioSetIdsRx} from "./state";
import {browser} from "../../chrome/const/extension";

export const callInMain = (commands, scope) => {
  return new Scenario(commands)
    .onTrack(({id, status, message}) => {
      if (status === STATUS.PENDING) {
        console.log(`errors.${id}`, {pending: true, message})
      }
      if (status === STATUS.DONE) {
        console.log(`errors.${id}`, {done: true, message})
      }
      if (status === STATUS.FAIL) {
        console.log(`errors.${id}`, {message})
      }
    })
    .execute(
      structuredClone(scope)
    )
}
export const whenPermissionActivated = async (permission, func) => {
  const isAllowed = await browser.permissions.contains({permissions: [permission]});
  let cleanUp = () => {};

  if (isAllowed) {
    cleanUp = func()
  }

  browser.permissions.onAdded.addListener(({permissions: enabledPermissions}) => {
    if(enabledPermissions && enabledPermissions.includes(permission)) {
      cleanUp = func()
    }
  })

  browser.permissions.onRemoved.addListener(({permissions: disabledPermissions}) => {
    if(disabledPermissions && disabledPermissions.includes(permission)) {
      cleanUp();
    }
  })
}

function areSetsEqual(set1, set2) {
  if (set1.size !== set2.size) {
    return false; // If sizes are different, sets are not equal
  }

  for (let item of set1) {
    if (!set2.has(item)) {
      return false; // If any item in set1 is not in set2, they are not equal
    }
  }

  return true; // Sets are equal if all items match
}

export function listen(api, triggerType) {
  let ids = triggersMapOfScenarioSetIdsRx.getValue().get(triggerType) ?? new Set();

  const ctrl = () => {
    const resources = getAllResources();

    for (const scenarioId of ids) {
      const scenario = resources.scenariosMap[scenarioId];
      const commands = scenario.commands;
      const cacheScopes = scenario.$$scopes;

      callInMain(commands, cacheScopes);
    }
  };

  const onEffect = () => {
    // UPDATE/ADD SECOND
    if (ids.size && api.hasListener(ctrl)) {
      console.log("ACTUAL", triggerType);
      return
    }
    // REMOVE
    if (!ids.size && api.hasListener(ctrl)) {
      console.log("REMOVE", triggerType);
      return api.removeListener(ctrl)
    }
    // ADD FIRST
    if (!api.hasListener(ctrl)) {
      console.log("ADD", triggerType);
      return api.addListener(ctrl)
    }
  }

  const {unsubscribe} = triggersMapOfScenarioSetIdsRx.subscribe(map => {
    const newIds = map.get(triggerType) ?? new Set();

    if(areSetsEqual(ids, newIds)) {
      return;
    }

    ids = newIds;
    onEffect();
  })

  onEffect();

  return unsubscribe;
}

