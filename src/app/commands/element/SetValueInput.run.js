import Validator from "../../validators/Validator";
import {getSourceValue} from "../../funcs/variables";

const run = async ({node, value}, {getProperty}) => {
  Validator.asNotEmpty(node, "node");

  const elem = getProperty(node);
  Validator.asNode(elem, node);

  const attrValue = getSourceValue(value, {getProperty});
  Validator.asString(attrValue, value.value);

  const event = new Event('input', {
    bubbles: true,
    cancelable: true,
  });

  // Emulate the value change
  elem.value = attrValue;
  // Dispatch the event
  elem.dispatchEvent(event);
}

export default run;
