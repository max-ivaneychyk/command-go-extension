import IdbKvStore from "idb-kv-store"
import {SCHEME_AS} from "../../app/const/scheme";

class DatabaseService {

  static tables = {
    scenarios: "COMMANDS_APP_scenarios",
    userScripts: "COMMANDS_APP_scripts",
    alarms: "COMMANDS_APP_alarms",
    net: "COMMANDS_APP_net",
  }

  constructor(name) {
    this.store = new IdbKvStore(name)
  }

  onChange(callback) {
    this.store.on("set", callback)
    this.store.on("add", callback)
    this.store.on("remove", callback)
  }

  get(key, _default) {
    return this.store.get(key).then(value => {
      return value ?? _default
    })
  }

  remove(key) {
    return this.store.remove(key)
  }

  getAll() {
    const items = [];

    return new Promise((resolve, reject) => {
      this.store.iterator(function (err, cursor) {
        if (err) {
          reject(err)
          throw err;
        }

        if (cursor) { // If we haven't reached the end
          items.push(cursor.value)
          cursor.continue() // This method will be called with the next item
          return
        }

        resolve(items)
      })
    })
  }
  entries() {
    const items = [];

    return new Promise((resolve, reject) => {
      this.store.iterator(function (err, cursor) {
        if (err) {
          reject(err)
          throw err;
        }

        if (cursor) { // If we haven't reached the end
          items.push([cursor.key, cursor.value])
          cursor.continue() // This method will be called with the next item
          return
        }

        resolve(items)
      })
    })
  }
  keys() {
    return this.store.keys()
  }
  values() {
    return this.store.values()
  }

  set(key, data) {
    return this.store.set(key, data)
  }
}


export default DatabaseService

export const TABLES = {
  [SCHEME_AS.COMMAND]: DatabaseService.tables.scenarios,
  [SCHEME_AS.USER_SCRIPT]: DatabaseService.tables.userScripts,
  [SCHEME_AS.NET]: DatabaseService.tables.net,
  [SCHEME_AS.ALARMS]: DatabaseService.tables.alarms,
}

