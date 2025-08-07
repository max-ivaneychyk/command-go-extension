import {browser} from "../../../chrome/const/extension";

class OpenNewTab {
  static key = "tabs.create"

  static exe(params) {
    return browser.tabs.create(params)
  }

  static isSupported () {
    return !!browser?.tabs?.create
  }
}

export default OpenNewTab;
