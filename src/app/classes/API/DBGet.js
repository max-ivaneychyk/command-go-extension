import Database from "../../../chrome/services/Database";

class DBGet {
  static key = "database.get"

  static exe({db, key}) {
    return new Database(db).get(key)
  }

  static isSupported() {
    return true;
  }
}

export default DBGet;
