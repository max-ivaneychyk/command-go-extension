import {getSourceValue} from "../../funcs/variables";
import ExecuteInMain from "../../classes/ExecuteInMain";
import DBGetEntries from "../../classes/API/DBGetEntries";


const run = async ({dbName, saveTo, main}, {getProperty, setProperty}) => {
  const db = getSourceValue(dbName, {getProperty});
  const value = await ExecuteInMain.callInMainWhen(main, DBGetEntries, {db})

  setProperty(saveTo, value)
}

export default run;
