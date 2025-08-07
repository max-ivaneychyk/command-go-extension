import {getSourceValue} from "../../funcs/variables";
import ExecuteInMain from "../../classes/ExecuteInMain";
import DBGetKeys from "../../classes/API/DBGetKeys";

const run = async ({dbName, saveTo, main}, {getProperty, setProperty}) => {
  const db = getSourceValue(dbName, {getProperty});
  const value = await ExecuteInMain.callInMainWhen(main, DBGetKeys, {db})

  setProperty(saveTo, value)
}

export default run

