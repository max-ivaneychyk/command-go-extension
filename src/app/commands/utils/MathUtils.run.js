import {buildUtilCommandsRun} from "./buildUtilCommands.run";
import utils from "./MathUtils.conf";
import {COMMANDS} from "../../const/commands";


export default buildUtilCommandsRun({
  utils,
  type: COMMANDS.MATH_UTILS
})
