import ExecuteInMainCommand from "../../classes/ExecuteInMain";
import GetAllTabs from "../../classes/API/GetAllTabs";

const run = async ({saveTo}, {setProperty}) => {
  const tabs = await ExecuteInMainCommand.callCommand(GetAllTabs, {});
  setProperty(saveTo, tabs)
}

export default run;
