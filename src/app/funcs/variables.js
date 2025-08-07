import {SOURCE_TYPES} from "../const/variables";
import Mustache from "mustache";


export const replaceAllVariables = (str, getPropertyValue) => {
  if (typeof str !== 'string') return str;

  const proxy = new Proxy({}, {
    has() {
      return true
    },
    get(target, prop) {
      return getPropertyValue(prop);
    },
    getOwnPropertyDescriptor(target, prop) {
      return { configurable: true, enumerable: true, value: getPropertyValue(prop) };
    },
  });

  const result = Mustache.render(str, proxy);

  console.warn(result);

  return result;
}


export const getSourceValue = (source, {getProperty} = {}) => {
  const result = source?.as !== SOURCE_TYPES.VARIABLE ? source?.value : getProperty(source?.value);

  if (typeof result === 'string' && getProperty) {
    return replaceAllVariables(result, getProperty)
  }

  return result;
}
