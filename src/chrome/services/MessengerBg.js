import {browser} from "../const/extension";
import {IS_DEV} from "../const/support";

let actions = {
  "PING": () => {
    return Promise.resolve("Pong")
  },
};

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const msg = message;
  const tab = sender.tab;

  if (msg.type === 'FROM_CONTENT' || msg.type === 'FROM_SIDEPANEL') return false;
  if (IS_DEV) console.log("Pending action", msg);

  const action = actions[msg.key];

  if (!action) {
    console.error("Not found action for ", msg)
    return false;
  }

  action(msg.params, {tabId: tab ? tab.id : null})
    .then(data => {
      sendResponse(({key: msg.key, data}));
    })
    .catch(err => {
      sendResponse(({key: msg.key, err}));
    })

  return true; /// await sendResponse
})

class Messenger {

  static registerHandlers(mapActions) {
    actions = {
      ...actions,
      ...mapActions
    }
  }
}


export default Messenger
