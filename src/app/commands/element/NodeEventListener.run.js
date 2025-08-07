import {getSourceValue} from "../../funcs/variables";
import Validator from "../../validators/Validator";


const run = async ({elem, saveTo, event, commands, eventData}, {getProperty, setProperty, ctx, call}) => {
  const node = getProperty(elem);
  const eventName = getSourceValue(event, {getProperty})

  if(node !== window)Validator.asNode(node, elem);
  Validator.asString(eventName, event.value);

  node.addEventListener(eventName, (event) => {
    if(eventData)setProperty(eventData, event);
    call({$commands: commands, $ctx: ctx})
  })
}

export default run;
