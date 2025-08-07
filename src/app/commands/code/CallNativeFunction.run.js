import {getSourceValue} from "../../funcs/variables";
import get from 'lodash/get'

export const callFunction = async ({arguments: args, func, ctx, source}, {getProperty}) => {
  const obj = getSourceValue(source, {getProperty});
  const methodName = getSourceValue(func, {getProperty});
  const params = args.map((k) => getSourceValue(k, {getProperty}));
  const methodAlias = get(obj, methodName)

  return methodAlias.apply(getSourceValue(ctx, {getProperty}) ?? obj, params)
}

const run = async (vars, utils) => {
  const {saveTo} = vars;
  const {setProperty} = utils;

  const result = await callFunction(vars, utils);

  setProperty(saveTo, result)
}

export default run;
