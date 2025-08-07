import Database from "../../../chrome/services/Database";

class DBRemove {
  static key = "database.remove"

  static exe({db, key}) {
    return new Database(db).remove(key)
  }

  static isSupported() {
    return true;
  }
}

export default DBRemove;
