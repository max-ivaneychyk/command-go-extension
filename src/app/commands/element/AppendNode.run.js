
import Validator from "../../validators/Validator";


const run = async ({from, to}, {getProperty}) => {
  const node = getProperty(to);
  const child = getProperty(from)

  Validator.asNode(node, to);
  Validator.asNode(child, from);

  node.append(child)
}
export default run;


