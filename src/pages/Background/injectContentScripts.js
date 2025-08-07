import {getAllResources} from "./triggers";
import {browser} from "../../chrome/const/extension";
import {LOAD_URL_CONDITION, TRIGGERS} from "../../app/const/triggers";
import {isSkipped} from "../../app/funcs/optional";
import {IS_DEV} from "../../chrome/const/support";

const MATCH_FUNCTIONS = {
  [LOAD_URL_CONDITION.START]: 'startsWith',
  [LOAD_URL_CONDITION.CONTAINS]: 'includes',
  [LOAD_URL_CONDITION.END]: 'endsWith',
}

const injectScenarios = (triggers, resources, target) => {
  if (!triggers.length) return;

  const scenarios = triggers.map(({scenarioId}) => {
    return resources.scenariosMap[scenarioId]
  });

  const cssItems = scenarios.flatMap(({commands}) => {
    const css = [];

    commands.forEach((command) => {
      if (command.type === "CSS" && command.immediately && !isSkipped(command)) {
        css.push(command.value)
      }
    })

    return css;
  });

  // todo is not working
  cssItems.forEach(css => {
    browser.scripting
      .insertCSS({
        target,
        css: css,
      })
      .then(() => {
        if(IS_DEV)console.log("CSS injected")
      });
  });

  function setScenarios(status, sc) {
    window.__scenarios = window.__scenarios ?? {};
    window.__scenarios[status] = JSON.parse(sc);
  }

  browser
    .scripting
    .executeScript({
      target,
      func: setScenarios,
      args: ["complete", JSON.stringify(scenarios)]
    });

  browser
    .scripting
    .executeScript({
      target,
      files: ["contentScript.bundle.js"]
    })
}

const matchAllURLSegments = (conditions, url) => {
  return !!conditions.length &&
  conditions.every(condition => {
    return url[MATCH_FUNCTIONS[condition.type]](condition.value);
  })
}

browser.webNavigation.onCompleted.addListener(function (details) {
  const tabId = details.tabId;
  const frameIds = [details.frameId];

  if (details.frameId !== 0) { // frameId 0 is the main frame, non-zero IDs are iframes
    const resources = getAllResources();
    const triggers = resources.triggersList.filter(({url, type, status, conditions = []}) => {
      return type === TRIGGERS.IFRAME_LOAD_URL && matchAllURLSegments(conditions, details.url);
    })

    injectScenarios(triggers, resources, {tabId, frameIds})
  }
});

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  const resources = getAllResources();

  const triggers = resources.triggersList.filter(({url, type, status, conditions = []}) => {
    return type === TRIGGERS.LOAD_URL &&
      changeInfo.status === status &&
      matchAllURLSegments(conditions, tab.url);
  })

  injectScenarios(triggers, resources, {tabId})
})

getAllResources()
