import {buildUtilCommandsRun} from "./buildUtilCommands.run";
import arrayUtilsConf from "./ArrayUtils.conf";
import {COMMANDS} from "../../const/commands";

const run = buildUtilCommandsRun({
  utils: arrayUtilsConf,
  type: COMMANDS.ARRAY_UTILS
})

export default run

