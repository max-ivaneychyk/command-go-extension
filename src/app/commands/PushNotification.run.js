import ExecuteInMain from "../classes/ExecuteInMain";
import Notifications from "../classes/API/Notifications";
import {getSourceValue} from "../funcs/variables";
import Validator from "../validators/Validator";


const run = async ({value, title, icon}, {getProperty}) => {
  const titleStr = getSourceValue(title, {getProperty});
  const valueStr = getSourceValue(value, {getProperty});

  Validator.asString(titleStr, 'title');
  Validator.asNotEmpty(titleStr, 'title');

  Validator.asString(valueStr, 'message');
  Validator.asNotEmpty(valueStr, 'message')

  const options = {
    title: titleStr,
    type: 'basic',
    priority: 2,
    requireInteraction: true,
    silent: false,
    // optional icon
    iconUrl: getProperty(icon),
    message: valueStr
  };

  return ExecuteInMain.callCommand(Notifications, options)
}

export default run
