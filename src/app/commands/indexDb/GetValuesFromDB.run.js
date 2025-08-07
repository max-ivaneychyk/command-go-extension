import {getSourceValue} from "../../funcs/variables";
import ExecuteInMain from "../../classes/ExecuteInMain";
import DBGetValues from "../../classes/API/DBGetValues";


const run = async ({dbName, saveTo, main}, {getProperty, setProperty}) => {
  const db = getSourceValue(dbName, {getProperty});
  const value = await ExecuteInMain.callInMainWhen(main, DBGetValues, {db})

  setProperty(saveTo, value)
}

export default run;
