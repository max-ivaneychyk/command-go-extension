import DBRemove from "../../classes/API/DBRemove";
import ExecuteInMain from "../../classes/ExecuteInMain";
import {getSourceValue} from "../../funcs/variables";

const run = async ({dbName, key, main}, {getProperty}) => {
  const db = getSourceValue(dbName, {getProperty});
  const dbKey = getSourceValue(key, {getProperty});
  await ExecuteInMain.callInMainWhen(main, DBRemove, {db, key: dbKey})
}

export default run;
