import {browser} from "../../../chrome/const/extension";
import {BROWSER} from "../../../chrome/const/support";

class Notifications {
  static key = "notifications.create"

  static exe(params) {
    if (!params.iconUrl) {
      params.iconUrl = browser.runtime.getURL('icon-34.png')
    }

    if(BROWSER === 'firefox') {
      delete params.requireInteraction;
      delete params.silent;
    }

    return browser.notifications.create(params)
  }

  static isSupported () {
    return !!browser.notifications?.create
  }
}

export default Notifications;
