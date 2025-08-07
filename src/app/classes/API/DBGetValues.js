import Database from "../../../chrome/services/Database";

class DBGetValues {
  static key = "database.values"

  static exe({db}) {
    return new Database(db).values()
  }

  static isSupported() {
    return true;
  }
}

export default DBGetValues;
