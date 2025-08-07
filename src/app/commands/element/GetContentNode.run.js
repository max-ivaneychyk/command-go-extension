import Validator from "../../validators/Validator";

const run = async ({node, saveTo}, {getProperty, setProperty}) => {
  const elem = getProperty(node);

  Validator.asNode(elem, node);
  Validator.asNotEmpty(saveTo, "Save to");

  setProperty(saveTo, elem.innerText);
}

export default run;
