import {calcBool} from "./If.run";
import {EARLY_RETURN_KEYWORD} from "../../const/scheme";
import {STATUS} from "../../classes/Scenario";

const run = async ({ifs, $id}, {getProperty, track}) => {
  const ifCommands = ifs.find(({conditions}) => calcBool({conditions, getProperty}));

  if (ifCommands) {
    track({id: $id, status: STATUS.PENDING, message: `Stopped`})
    return EARLY_RETURN_KEYWORD;
  }
}

export default run
