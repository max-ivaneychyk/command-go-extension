import {calcBool} from "./If.run";
import {getSourceValue} from "../../funcs/variables";


const run = async ({conditions, then_value, else_value, saveTo}, {getProperty, setProperty}) => {
  const ifCommand = calcBool({conditions, getProperty});
  const result = getSourceValue(!!ifCommand ? then_value : else_value, {getProperty});

  setProperty(saveTo, result);
}

export default run
