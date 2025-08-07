import {browser} from "../../../chrome/const/extension";

class GetAllTabs {
  static key = "tabs.query"

  static exe() {
    return browser.tabs.query({})
  }

  static isSupported () {
    return !!browser?.tabs?.query
  }
}

export default GetAllTabs;
