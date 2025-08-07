import {getSourceValue} from "../../funcs/variables";
import Validator from "../../validators/Validator";

export const isPrototype = (name) => name.includes(".prototype");

export const buildUtilCommandsRun = ({utils, type}) => {
  const run = async ({func, arguments: args, saveTo, from}, {setProperty, getProperty}) => {
    const params = args.map((item) => getSourceValue(item, {getProperty}));
    const entity = getSourceValue(from, {getProperty});
    const isProto = isPrototype(func);

    if (isProto) Validator.asNotEmpty(from, "entity");
    Validator.asNotEmpty(func, "Util");

    const allParams = isProto ? [entity, ...params] : params;

    setProperty(saveTo, utils[func].run(...allParams));
  }


  return run
}
