import {getSourceValue} from "../../funcs/variables";
import Validator from "../../validators/Validator";

const run = async ({from, saveTo, func}, {getProperty, setProperty}) => {
  const source = getSourceValue(from, {getProperty});

  Validator.asNotEmpty(func, "JSON.<func>")
  Validator.asNotEmpty(source, "Source")
  Validator.asNotEmpty(saveTo, "Save to")

  setProperty(saveTo, JSON[func](source))
}

export default run


