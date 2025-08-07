import {browser} from "../../chrome/const/extension";
import {BROWSER} from "../../chrome/const/support";

if(BROWSER === 'chrome'){
  browser.action.onClicked.addListener(function (tab) {
    // Get the current active tab
    const tabId = tab.id;

    browser.sidePanel.setOptions({
      tabId,
      path: 'options.html',
      enabled: true
    });

    browser.sidePanel.open({tabId});
  });
} else if(BROWSER === 'firefox'){

  browser.action.onClicked.addListener(function (tab) {
    // Get the current active tab
    //const tabId = tab.id;

    //const panel = browser.runtime.getURL("/options.html");

    browser.sidebarAction.toggle()

    // browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
    //   myWindowId = windowInfo.id;
    // });
  });


}
