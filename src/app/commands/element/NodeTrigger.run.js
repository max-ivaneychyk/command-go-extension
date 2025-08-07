import {getSourceValue} from "../../funcs/variables";
import Validator from "../../validators/Validator";

const run = async ({from, action}, {getProperty}) => {
  const eventName = getSourceValue(action, {getProperty});

  Validator.asNotEmpty(from, "Variable");

  getProperty(from)?.[eventName]();
}

export default run;
