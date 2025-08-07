import ExecuteInMainCommand from "../../classes/ExecuteInMain";
import TTSSpeak from "../../classes/API/TTSSpeak";
import {getSourceValue} from "../../funcs/variables";
import Validator from "../../validators/Validator";

export const languages = [
  {name: "en-US", id: "en-US"},
]

const run = async ({text: t, rate, lang, enqueue, voiceName}, {getProperty}) => {
  const text = getSourceValue(t, {getProperty});

  Validator.asString(text, 'text');
  Validator.asNotEmpty(text, 'text');

  await ExecuteInMainCommand.callCommand(TTSSpeak, {
    lang: getSourceValue(lang, {getProperty}),
    rate: +getSourceValue(rate, {getProperty}), /// todo - debug error show on ui when it is string not number
    text,
    voiceName: getSourceValue(voiceName, {getProperty}),
  })
}

export default run;
