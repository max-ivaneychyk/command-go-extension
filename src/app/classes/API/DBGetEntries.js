import Database from "../../../chrome/services/Database";

class DBGetEntries {
  static key = "database.entries"

  static exe({db}) {
    return new Database(db).entries();
  }

  static isSupported() {
    return true;
  }
}

export default DBGetEntries;
