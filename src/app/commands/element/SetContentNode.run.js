import Validator from "../../validators/Validator";
import {getSourceValue} from "../../funcs/variables";

const run = async ({node, html}, {getProperty}) => {
  const elem = getProperty(node);
  Validator.asNode(elem, node);

  const content = getSourceValue(html, {getProperty});
  Validator.asString(content, html.value);

  elem.innerHTML = content;
}

export default run
