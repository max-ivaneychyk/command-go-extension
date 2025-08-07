import Database, {TABLES} from "./Database";
import {hooksMap} from "../../app/map.hooks";
import {STATUS} from "../../app/classes/Scenario";

class ScenarioHooks {
  static async chainHooks (scheme, getHook) {
    let line = Promise.resolve(scheme);
    const results = [];

    ;[].concat(scheme.triggers).concat(scheme.commands).forEach(trigger => {
      const func = getHook(hooksMap.get(trigger.type))

      if(!func)return;

      line = line
        .then(() => func(trigger).catch(err => {
          const result = {id: trigger.$id, status: STATUS.FAIL, message: err.toString()};

          results.push(result);
          return Promise.reject(err)
        }))
        .then(() => {
          const result = {id: trigger.$id, status: STATUS.DONE};

          results.push(result);
          return Promise.resolve(result)
        })
    });

    return line
      .then(() => results)
      .catch(() => Promise.reject(results))
  }

  static install(scheme) {
    return this.chainHooks(scheme, hooks => {
      return hooks?.onInstall;
    })
  }

  static async uninstall (scheme) {
    const prev = await new Database(TABLES[scheme.$$schema]).get(scheme.$$uuid);

    if(!prev)return Promise.resolve(scheme);

    return this.chainHooks(prev, hooks => {
      return hooks?.onUninstall;
    })
  }
}


export default ScenarioHooks;
