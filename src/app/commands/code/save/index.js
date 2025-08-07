import Validator from "../../../validators/Validator";
import ExecuteInMain from "../../../classes/ExecuteInMain";
import UserScript from "../../../classes/API/UserScript";
import {Sandbox} from "../../../../chrome/services/Sandbox";
import {isSkipped} from "../../../funcs/optional";
import {LANG} from "../../../components/Editor";


const wrappers = {
  [LANG.CSS]: code => {
    return `
    const style = document.createElement("style");
    style.innerHTML = \`${code}\`;
    document.head.appendChild(style);`
  }
}


export const saveInlineScript = async ({code, $id, $$formId, matches, lang, world, ...additional}) => {
  const wrapper = wrappers[lang] || (c => c);

  if(isSkipped(additional))return;

  Validator.asNotEmpty(matches[0], "matches")
  await ExecuteInMain.callInMainWhen(false, UserScript, {code: wrapper(code), id: UserScript.createId($$formId, $id), matches, world})
}

export const saveBySrcScript = async ({src, $id, $$formId, matches, ...additional}) => {
  if(isSkipped(additional))return;

  Validator.asNotEmpty(src, "src");
  Validator.asNotEmpty(matches[0], "matches");

  const code = await Sandbox.fetchScriptContent(src);
  await ExecuteInMain.callInMainWhen(false, UserScript, {code, id: UserScript.createId($$formId, $id), matches})
}

export const USER_SCRIPT_COMMANDS = {
  INJECT_INLINE_CODE: 'INJECT_INLINE_CODE',
  LOAD_SCRIPT_BY_SRC: 'LOAD_SCRIPT_BY_SRC',
};

export const USER_SCRIPT_FUNCTIONS = {
  [USER_SCRIPT_COMMANDS.INJECT_INLINE_CODE]: saveInlineScript,
  [USER_SCRIPT_COMMANDS.LOAD_SCRIPT_BY_SRC]: saveBySrcScript,
}
