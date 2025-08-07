import {getSourceValue} from "../../funcs/variables";
import Validator from "../../validators/Validator";

const run = async ({from, saveTo}, {getProperty, setProperty}) => {
  const formData = new FormData();
  const model = getSourceValue(from, {getProperty});

  Validator.asNotEmpty(from.value, "from");
  Validator.asObject(model, "from");

  Object.entries(model).forEach(([key, value]) => {
    formData.append(key, value)
  });

  setProperty(saveTo, formData);
}

export default run
