import Extension from "../../chrome/services/Extension";

const ext = new Extension()

class ExecuteInMain {
  static callCommand(Command, params) {
    if (Command.isSupported()) return Command.exe(params)

    return ext.request("BG:COMMAND", {command: Command.key, params});
  }

  static callInMainWhen(main, Command, params) {
    class A extends Command {
      static isSupported() {
        return !main
      }
    }

    return this.callCommand(A, params)
  }
}


export default ExecuteInMain
