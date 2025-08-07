import Database, {TABLES} from "./Database";
import ScenarioHooks from "./Hooks";

class ScenarioFacade {
  constructor(scheme) {
    this.scheme = structuredClone(scheme);
    this.scheme.errors = {};
    this.db = new Database(TABLES[scheme.$$schema])
  }

  async save() {
    return ScenarioHooks.uninstall(this.scheme)
      .then(() => this.db.set(this.scheme.$$uuid, this.scheme))
      .then(() => ScenarioHooks.install(this.scheme))
  }

  async delete() {
    return ScenarioHooks.uninstall(this.scheme)
      .then(() => this.db.remove(this.scheme.$$uuid))
  }
}


export default ScenarioFacade;
