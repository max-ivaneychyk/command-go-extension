import {getSourceValue} from "../funcs/variables";
import Validator from "../validators/Validator";

export const times = [
  {name: "ms", id: "ms"},
  {name: "sec", id: "sec"},
  {name: "min", id: "min"},
]

const run = async ({format, delay}, {getProperty}) => {
  const delayInt = getSourceValue(delay, {getProperty});

  Validator.asNumber(delayInt, "delay")
  Validator.asPositiveNumber(delayInt, "delay");

  return new Promise(resolve => {
    const formatToTime = {
      "ms": 1,
      "sec": 1000,
      "min": 60 * 1000
    }
    setTimeout(resolve, delayInt * formatToTime[format])
  })
}

export default run;
