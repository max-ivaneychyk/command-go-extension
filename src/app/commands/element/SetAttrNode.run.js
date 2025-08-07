import Validator from "../../validators/Validator";
import {getSourceValue} from "../../funcs/variables";

const run = async ({node, attr, value}, {getProperty}) => {
  const elem = getProperty(node);
  // eslint-disable-next-line no-undef
  const attrValue = getSourceValue(value, {getProperty});
  const attrName = getSourceValue(attr, {getProperty});

  Validator.asNode(elem, node);
  Validator.isAny(attrValue, "Attribute value");
  Validator.isAny(attrName, "Attribute name");

  elem.setAttribute(attrName, attrValue)
};

export default run
