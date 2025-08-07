import {runLoopLifeCycle} from "./Array.prototype.map.run";
import Validator from "../../validators/Validator";


const run = async (vars, utils) => {
  const {from, saveTo} = vars;
  const {setProperty} = utils;
  const {step, list} = runLoopLifeCycle(vars, utils);

  Validator.asArray(list, from)

  let i = 0;
  for await (let item of list) {
    const isTrue = await step(item, i);

    if(!isTrue){
      setProperty(saveTo, false)
      return;
    }

    i++;
  }

  setProperty(saveTo, true)
}

export default run;
