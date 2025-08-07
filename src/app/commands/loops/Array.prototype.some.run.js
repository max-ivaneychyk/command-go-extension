import Validator from "../../validators/Validator";
import {runLoopLifeCycle} from "./Array.prototype.map.run";

const run = async (vars, utils) => {
  const {from, saveTo} = vars;
  const {setProperty} = utils;
  const {step, list} = runLoopLifeCycle(vars, utils);

  Validator.asArray(list, from)

  let i = 0;
  for await (let item of list) {
    const isSome = await step(item, i);

    if(isSome){
      setProperty(saveTo, true)
      return;
    }

    i++;
  }

  setProperty(saveTo, false)
}

export default run;
