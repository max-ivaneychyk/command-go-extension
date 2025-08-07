import {getSourceValue} from "../../funcs/variables";
import Validator from "../../validators/Validator";
import {browser} from "../../../chrome/const/extension";

// Run function to close the browser tab
const run = async ({tabId, saveTo}, {getProperty}) => {
  // If a tab ID is provided, use it, otherwise close the current tab
  const id = getSourceValue(tabId, {getProperty});

  Validator.asNumber(id, "tabId");
  Validator.asNotEmpty(id, "tabId");

  await browser.tabs.remove(id);
};

export default run;
