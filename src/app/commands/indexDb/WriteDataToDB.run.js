import {getSourceValue} from "../../funcs/variables";
import ExecuteInMain from "../../classes/ExecuteInMain";
import DBSet from "../../classes/API/DBSet";

const run = async ({dbName, key, value, main}, {getProperty}) => {
  const db = getSourceValue(dbName, {getProperty});
  const dbKey = getSourceValue(key, {getProperty});
  await ExecuteInMain.callInMainWhen(main, DBSet, {db, key: dbKey, value: getProperty(value)})
}

export default run



