import {Sandbox} from "../../../chrome/services/Sandbox";
import {getSourceValue} from "../../funcs/variables";

const run = async ({format, value, saveTo, arguments: args}, {getProperty, setProperty}) => {
  const p = args
    .map((item) => getSourceValue(item, {getProperty}))
    .map(data => (JSON.stringify(data) ?? "undefined"))
    .join(", ");

  const code = `${value}; main(${p})`

  return Sandbox.execute(code)
    .then(result => setProperty(saveTo, result))
}

export default run;
