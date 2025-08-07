import {getSourceValue} from "../../funcs/variables";
import ExecuteInMain from "../../classes/ExecuteInMain";
import DBGet from "../../classes/API/DBGet";


const run = async ({dbName, key, saveTo, main}, {getProperty, setProperty}) => {
  const db = getSourceValue(dbName, {getProperty});
  const dbKey = getSourceValue(key, {getProperty});
  const value = await ExecuteInMain.callInMainWhen(main, DBGet, {db, key: dbKey})

  setProperty(saveTo, value)
}

export default run;
