import Validator from "../../validators/Validator";
import {runLoopLifeCycle} from "./Array.prototype.map.run";

const run = async (vars, utils) => {
  const {from, saveTo} = vars;
  const {setProperty} = utils;
  const {step, list} = runLoopLifeCycle(vars, utils);

  const res = []

  Validator.asArray(list, from)

  let i = 0;
  for await (let item of list) {
    const isFiltered = await step(item, i);

    if(isFiltered)res.push(item);

    i++;
  }

  setProperty(saveTo, res)
}
export default run
