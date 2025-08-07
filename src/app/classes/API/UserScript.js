import {browser} from "../../../chrome/const/extension";

class UserScript {
  static key = "UserScript"

  static createId(formId, id) {
    return `${formId}:::${id}`
  }

  static parseId(id) {
    return id.split(":::")
  }

  static getAll() {
    return browser.userScripts.getScripts()
  }

  static async unregister(id) {
    const prevScripts = await browser.userScripts.getScripts({ids: [id]});
    if (!id || !prevScripts.length) return Promise.resolve();
    return browser.userScripts.unregister({ids: [id]})
  }

  static async exe({code, id, matches, world = 'USER_SCRIPT'}) {
    const list = await browser.userScripts.getScripts(
      {ids: [id]},
    );

    const method = list.length ? "update" : "register";

    return browser.userScripts[method]([{
      id,
      matches,
      world,
      js: [{code: code}]
    }])
  }

  static isSupported() {
    return !!browser?.userScripts
  }
}

export default UserScript;
