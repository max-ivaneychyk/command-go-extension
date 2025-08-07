import {initUI} from "../../app";
import {Scenario} from "../../app/classes/Scenario";
import {browser} from "../../chrome/const/extension";
import {IS_DEV} from "../../chrome/const/support";

if(IS_DEV)console.log("> SIDEBAR ")

const prepareScripts = async (tabId) => {

  function setScenarios() {
    const isReady = !!window.__scenarios;
    window.__scenarios = window.__scenarios || [];
    return isReady;
  }

  await browser.scripting
    .executeScript({
      target: {tabId},
      func: setScenarios,
      args: []
    })
    .then(([{result}]) => {
        if (result) return;

        return browser.scripting.executeScript({
          target: {tabId},
          files: ["contentScript.bundle.js"]
        })
      }
    )
}

class ExecEmbed extends Scenario {

  static cleanUp = () => null;

  constructor(instructions, {debug = false, reload = false} = {}) {
    super(instructions)
    this.debug = !!debug;
    this.reload = reload;
    this.instructions = instructions;
  }

  onTrack(func) {
    this.track = func;
    return this
  }

  async execute(scope) {
    const [page] = await browser.tabs.query({active: true, currentWindow: true});
    const tabId = page.id;

    if (!page.url.startsWith('http')) return Promise.reject({
      message: "Site URL should start from 'http(s)' "
    });

    if(this.reload) {
      return browser.tabs.reload(page.id);
    }

    const message = {
      debug: this.debug,
      to: {url: page.url, id: page.id},
      commands: this.instructions,
      scope
    };

    const listener = (msg) => {
      if (msg.type === "FROM_CONTENT") {
        const {id, status, message} = msg.message;

        this.track({id, status, message})
      }
    }

    ExecEmbed.cleanUp = () => {
      browser.runtime.onMessage.removeListener(listener);
    };

    browser.runtime.onMessage.addListener(listener);

    await prepareScripts(tabId);
    // todo - send event stop
    return browser.tabs.sendMessage(page.id, {type: "FROM_SIDEPANEL", message});
  }
}


window.OPTIONS = true

async function initAll() {
  const [page] = await browser.tabs.query({active: true, currentWindow: true});

  initUI(ExecEmbed, page?.url ?? "", page?.title.slice(0, 30).concat(' ...') ?? "");

}

initAll();
