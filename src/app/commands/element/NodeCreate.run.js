import Validator from "../../validators/Validator";
import {getSourceValue} from "../../funcs/variables";


const run = async ({tag, saveTo}, {setProperty, getProperty}) => {
  const tagName = getSourceValue(tag, {getProperty});

  Validator.asNotEmpty(tagName, "tag");
  Validator.asNotEmpty(saveTo, "saveTo");

  const node = document.createElement(tagName);
  setProperty(saveTo, node);
}

export default run;
