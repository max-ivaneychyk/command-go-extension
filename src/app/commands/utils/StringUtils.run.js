import utils from "./StringUtils.conf";
import {buildUtilCommandsRun} from "./buildUtilCommands.run";
import {COMMANDS} from "../../const/commands";

export default buildUtilCommandsRun({
  utils: utils,
  type: COMMANDS.STRING_UTILS
})
