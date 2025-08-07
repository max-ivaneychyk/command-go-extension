import {browser} from "../const/extension";

class Extension {
  request (key, params) {
    return new Promise((resolve, reject) => {
      const response  = browser.runtime.sendMessage({key, params});

      response
        .then(d => {
          if(d?.err) reject(d?.err);
          resolve(d?.data || null);
        })
        .catch(err => {
          reject(err?.err)
        })
    })
  }
}

export default Extension

