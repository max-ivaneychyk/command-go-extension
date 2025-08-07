import {getSourceValue} from "../../funcs/variables";
import Validator from "../../validators/Validator";


const run = async ({selector, saveTo, multi, retrySeconds, parent}, {setProperty, getProperty}) => {
  const selectorName = getSourceValue(selector, {getProperty});
  const parentElement = getSourceValue(parent, {getProperty}) ?? document;

  Validator.asNotEmpty(selectorName, "Selector");
  Validator.asNotEmpty(saveTo, "Save to");
  Validator.asNumber(retrySeconds, "Retry seconds");

  const find = () => {
    const node = multi ? Array.from(parentElement.querySelectorAll(selectorName)) : parentElement.querySelector(selectorName);

    setProperty(saveTo, node);

    if (multi) return !!node.length;

    return !!node
  }

  return new Promise((resolve) => {
    const startedAt = Date.now();

    function loop() {
      const isFound = find();
      const isLimitRetryReached = (startedAt + (retrySeconds || 0) * 1000) < Date.now()

      if (isFound || isLimitRetryReached) return resolve();

      setTimeout(loop, 120)
    }

    loop();
  })
}

export default run;
