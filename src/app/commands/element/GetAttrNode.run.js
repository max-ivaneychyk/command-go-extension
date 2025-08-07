import {getSourceValue} from "../../funcs/variables";
import Validator from "../../validators/Validator";


const run = async ({node, attr, saveTo}, {getProperty, setProperty}) => {
  const elem = getProperty(node);
  const attrName = getSourceValue(attr, {getProperty});

  Validator.asNode(elem, node);
  Validator.asNotEmpty(attrName, "attr");
  Validator.asNotEmpty(saveTo, "saveTo");

  setProperty(saveTo, elem.getAttribute(attrName))
}

export default run;

