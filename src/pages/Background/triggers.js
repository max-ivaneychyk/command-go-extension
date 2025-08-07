import {db} from "./database";
import {triggersMapOfScenarioSetIdsRx} from "./state";


let scenariosMap = {};
let triggersList = [];


export const getAllResources = () => ({
  scenariosMap,
  triggersList,
})

const refreshScenarios = () => {
  db.getAll().then(scenes => {
    // reset old values
    scenariosMap = {};
    triggersList = [];
    const triggersMap = new Map();

    scenes.forEach((scene) => {
      const uuid = scene.$$uuid;
      const triggers = scene.triggers || [];

      if (!triggers.length) return;

      scenariosMap[uuid] = scene;

      // FOR RX
      triggers.forEach(trigger => {
        const set = triggersMap.get(trigger.type);

        if(set) {
          set.add(uuid);
          return;
        }

        triggersMap.set(trigger.type, new Set([uuid]))
      });

      triggersList = triggersList.concat(triggers.map(data => {
        return {
          ...data,
          scenarioId: uuid
        }
      }))
    })
    triggersMapOfScenarioSetIdsRx.next(triggersMap);
    // FOR RX
  })
};

// listeners
db.onChange(refreshScenarios);
refreshScenarios();

//// END DOWNLOAD SCENARIOS

