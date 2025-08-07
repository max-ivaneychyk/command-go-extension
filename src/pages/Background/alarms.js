import {getAllResources} from "./triggers";
import {TRIGGERS} from "../../app/const/triggers";
import '../../app/map.bg.run'
import {callInMain} from "./listenAnyAPIs";

chrome.alarms.onAlarm.addListener((alarm) => {
  const resources = getAllResources();
  const filteredTriggers = resources.triggersList
    .filter(trigger => trigger.type === TRIGGERS.ALARM && alarm.name === trigger.key);

  filteredTriggers.forEach(({scenarioId}) => {
    const scenario = resources.scenariosMap[scenarioId];
    const commands = scenario.commands;
    const cacheScopes = scenario.$$scopes;

    callInMain(commands, cacheScopes);
  });
});
