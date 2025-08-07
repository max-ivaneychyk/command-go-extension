import Database from "../../chrome/services/Database";

export const db = new Database(Database.tables.scenarios);
export const dbUserScripts = new Database(Database.tables.userScripts);
