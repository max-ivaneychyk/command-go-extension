import {nanoid} from "nanoid";
import {callFunction} from "../code/CallFunction.run";
import Validator from "../../validators/Validator";
import {SOURCE_TYPES} from "../../const/variables";


export const runLoopLifeCycle = (vars, utils) => {
  const {from, func, $id} = vars;
  const {getProperty, setProperty, track} = utils;

  const list = getProperty(from);
  const label = nanoid();

  return {
    list,
    async step(item , i) {
      const saveTo = `__$saveTo:${i} (${label})`
      const itemVariable = `__$item:${i} (${label})`
      const indexVariable = `__$index:${i} (${label})`;

      setProperty(itemVariable, item);
      setProperty(indexVariable, i);

      track({id: $id, status: 0, message: `${i} of ${list.length}`})

      return await callFunction({
        func, saveTo, arguments: [
          {value: itemVariable, as: SOURCE_TYPES.VARIABLE},
          {value: indexVariable, as: SOURCE_TYPES.VARIABLE}
        ]
      }, utils);
    }
  }
}

const run = async (vars, utils) => {
  const {from, saveTo} = vars;
  const {setProperty} = utils;
  const {step, list} = runLoopLifeCycle(vars, utils);

  const res = []

  Validator.asArray(list, from)

  let i = 0;
  for await (let item of list) {
    const out = await step(item, i);
    res.push(out);
    i++;
  }

  setProperty(saveTo, res)
}

export default run
