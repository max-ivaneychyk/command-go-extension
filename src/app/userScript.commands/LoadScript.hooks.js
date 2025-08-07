import {saveBySrcScript} from "../commands/code/save";
import UserScript from "../classes/API/UserScript";

const hooks = {
  onInstall: saveBySrcScript,
  onUninstall: async ({$$formId, $id}) => {
    const id = UserScript.createId($$formId, $id);
    await UserScript.unregister(id);
  }
}

export default hooks
