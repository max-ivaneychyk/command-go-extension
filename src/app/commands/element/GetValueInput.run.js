import Validator from "../../validators/Validator";


const run = async ({node, saveTo}, {getProperty, setProperty}) => {
  Validator.asNotEmpty(saveTo, "Save to");
  Validator.asNotEmpty(node, "Element");

  const elem = getProperty(node);

  Validator.asNode(elem, node);

  setProperty(saveTo, elem.value)
}

export default run
