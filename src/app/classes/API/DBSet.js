import Database from "../../../chrome/services/Database";

class DBSet {
  static key = "database.set"

  static exe({db, key, value}) {
    return new Database(db).set(key, value)
  }

  static isSupported() {
    return true;
  }
}

export default DBSet;
