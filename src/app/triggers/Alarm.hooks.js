import {browser} from "../../chrome/const/extension";

const hooks = {
  onInstall: async (trigger) => {
    const {delayInMinutes, periodInMinutes, key} = trigger;

    await browser.alarms.create(key.toString(), {
      delayInMinutes: Number(delayInMinutes),
      periodInMinutes: Number(periodInMinutes)
    });
  },
  onUninstall: async (trigger) => {
    const {key} = trigger;
    await browser.alarms.clear(key.toString());
  },
}

export default hooks;
