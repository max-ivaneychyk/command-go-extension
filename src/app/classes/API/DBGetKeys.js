import Database from "../../../chrome/services/Database";

class DBGetKeys {
  static key = "database.keys"

  static exe({db}) {
    return new Database(db).keys()
  }

  static isSupported() {
    return true;
  }
}

export default DBGetKeys;
