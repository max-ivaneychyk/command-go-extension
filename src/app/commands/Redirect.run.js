import Validator from "../validators/Validator";
import {getSourceValue} from "../funcs/variables";

const run = async ({to}, {getProperty}) => {
  const href = getSourceValue(to, {getProperty});

  Validator.asNotEmpty(href, "link")

  window.location.href = href;
}

export default run;

