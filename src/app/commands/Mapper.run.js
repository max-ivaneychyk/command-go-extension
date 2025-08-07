import get from 'lodash/get'
import set from 'lodash/set'
import {getSourceValue} from "../funcs/variables";
import {SOURCE_TYPES} from "../const/variables";
import {excludeAllSkipped} from "../funcs/optional";

export const formats = [
  {name: "single property", id: "single"},
  {name: "object of properties", id: "multi"},
]

const run = async ({format, fields, saveTo, from}, {setProperty, getProperty}) => {
  const src = {};
  const data = getProperty(from);
  const isSingle = format === 'single'

  if (isSingle) {
    fields = [{
      to: fields[0].to,
      from: {
        as: SOURCE_TYPES.INPUT,
        value: 'result'
      }
    }]
  }

  excludeAllSkipped(fields).forEach(({from, to}) => {
    set(src,
      getSourceValue(from, {getProperty}),
      get(data, getSourceValue(to, {getProperty}))
    );
  });

  setProperty(
    saveTo,
    isSingle ? src?.result : src
  )
}

export default run
