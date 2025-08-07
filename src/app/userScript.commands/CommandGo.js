import {browser} from "../../chrome/const/extension";

// todo -draft
const Go = new Proxy({}, {
  get(_, prop) {
    const api = browser;
    if (!api?.[prop]) return undefined;

    return typeof api[prop] === "function"
      ? api[prop].bind(api)
      : new Proxy(api[prop], {get: (_, subProp) => api[prop][subProp]?.bind?.(api[prop]) ?? api[prop][subProp]});
  }
});
