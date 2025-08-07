import set from 'lodash/set'
import {getSourceValue} from "../funcs/variables";

const run = async ({fields, saveTo}, {getProperty}) => {
  const obj = getProperty(saveTo);

  fields.forEach(({key, value}) => {
    set(obj,
      getSourceValue(key, {getProperty}),
      getSourceValue(value, {getProperty}),
    );
  });
}

export default run;
