import utils from "./ObjectUtils.conf";
import {buildUtilCommandsRun} from "./buildUtilCommands.run";
import {COMMANDS} from "../../const/commands";

export default buildUtilCommandsRun({
  utils: utils,
  type: COMMANDS.OBJECT_UTILS
})
