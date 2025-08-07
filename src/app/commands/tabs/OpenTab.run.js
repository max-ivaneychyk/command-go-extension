import Validator from "../../validators/Validator";
import {getSourceValue} from "../../funcs/variables";
import OpenNewTab from "../../classes/API/OpenNewTab";
import ExecuteInMain from "../../classes/ExecuteInMain";

const run = async ({value, saveTo}, {getProperty, setProperty}) => {
  const url = getSourceValue(value, {getProperty});
  const options = {url};

  Validator.asString(url, "URL");

  const tab = await ExecuteInMain.callCommand(OpenNewTab, options);

  setProperty(saveTo, tab)
}

export default run;
