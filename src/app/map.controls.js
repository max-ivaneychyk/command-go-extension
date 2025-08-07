import { DelayCommand } from './commands/Delay';
import { LogCommand } from './commands/Log';
import { FetchCommand } from './commands/network/Fetch';
import { InitVariableCommand } from './commands/Variable';
import { FindNodeCommand } from './commands/element/FindNode';
import { ForEachCommand } from './commands/loops/ForOf';
import { IFCommand } from './commands/conditions/If';
import { MapperCommand } from './commands/Mapper';
import { CSSCodeCommand } from './commands/code/CodeCSS';
import { InjectCodeCommand } from './commands/code/CodeJS';
import { FunctionCommand } from './commands/code/Function';
import { CallFunctionCommand } from './commands/code/CallFunction';
import { OpenNewTabCommand } from './commands/tabs/OpenTab';
import { CreateNodeCommand } from './commands/element/NodeCreate';
import { RemoveNodeCommand } from './commands/element/RemoveNode';
import { JSONCommand } from './commands/utils/JSON';
import { AppendNodeCommand } from './commands/element/AppendNode';
import { SetContentNodeCommand } from './commands/element/SetContentNode';
import { SetAttrNodeCommand } from './commands/element/SetAttrNode';
import { NodeListenerCommand } from './commands/element/NodeEventListener';
import { GetDataFromDBCommand } from './commands/indexDb/GetFromDB';
import { WriteDataToDBCommand } from './commands/indexDb/WriteDataToDB';
import { GetAttrNodeCommand } from './commands/element/GetAttrNode';
import { GetContentNodeCommand } from './commands/element/GetContentNode';
import { GetValueNodeCommand } from './commands/element/GetValueInput';
import { SetValueInputCommand } from './commands/element/SetValueInput';
import { CommentCommand } from './commands/Comment';
import { GetKeysFromDBCommand } from './commands/indexDb/GetKeysFromDB';
import { TriggerNodeCommand } from './commands/element/NodeTrigger';
import { GetEntriesFromDBCommand } from './commands/indexDb/GetEntriesFromDB';
import { GetValuesFromDBCommand } from './commands/indexDb/GetValuesFromDB';
import { RemoveDataFromDBCommand } from './commands/indexDb/RemoveFromDB';
import { PushNotificationCommand } from './commands/PushNotification';
import { GroupCommand } from './commands/Group';
import { InitGlobalVariableCommand } from './commands/internal/GlobalVariable';
import { ObjectUtilsCommand } from './commands/utils/ObjectUtils';
import { MathUtilsCommand } from './commands/utils/MathUtils';
import { IFTernaryCommand } from './commands/conditions/IfTernary';
import { ArrayUtilsCommand } from './commands/utils/ArrayUtils';
import { RedirectCommand } from './commands/Redirect';
import { ArrayMapCommand } from './commands/loops/Array.prototype.map';
import { ArrayFilterCommand } from './commands/loops/Array.prototype.filter';
import { ArrayFindCommand } from './commands/loops/Array.prototype.find';
import { ArrayEveryCommand } from './commands/loops/Array.prototype.every';
import { ArraySomeCommand } from './commands/loops/Array.prototype.some';
import { SetValueCommand } from './commands/Set';
import { SCHEME_AS } from './const/scheme';
import { TemplateCommand } from './commands/code/Template';
// User Scripts
import { InjectJSCodeCommand } from './userScript.commands/InjectCodeJS';
import { LoadScriptCommand } from './userScript.commands/LoadScript';
// Network
import { NetRulesCommand } from './network.commands/NetRules';
import { GetAllTabsCommand } from './commands/tabs/GetAllTabs';
import { TTSSpeakCommand } from './commands/tts/TTSSpeak';
import { BROWSER } from '../chrome/const/support';
import { CallNativeFunctionCommand } from './commands/code/CallNativeFunction';
import { IFEarlyReturnCommand } from './commands/conditions/IfEarly';
import {permissionsMap} from "./map.permissions";

const commands = [
  // Hidden Internal Commands
  InitGlobalVariableCommand,
  // Logic
  InitVariableCommand,
  ForEachCommand,
  IFCommand,
  IFEarlyReturnCommand,
  IFTernaryCommand,
  // Functions
  FunctionCommand,
  CallFunctionCommand,
  CallNativeFunctionCommand,
  // CallNextScenarioCommand,
  GroupCommand,
  TemplateCommand,
  InjectCodeCommand,
  InjectJSCodeCommand,
  LoadScriptCommand,
  // Network
  FetchCommand,
  // Utils
  ObjectUtilsCommand,
  JSONCommand,
  ArrayUtilsCommand,

  ArrayMapCommand,
  ArrayFilterCommand,
  ArrayFindCommand,
  ArrayEveryCommand,
  ArraySomeCommand,

  MathUtilsCommand,

  // "Navigation",
  RedirectCommand,

  // Timers
  DelayCommand,
  // DelayCommandNext,
  // Mapper
  MapperCommand,
  //
  SetValueCommand,
  // Styles
  CSSCodeCommand,

  LogCommand,

  CommentCommand,

  GetDataFromDBCommand,
  GetKeysFromDBCommand,
  GetValuesFromDBCommand,
  GetEntriesFromDBCommand,
  WriteDataToDBCommand,
  RemoveDataFromDBCommand,

  CreateNodeCommand,
  FindNodeCommand,
  AppendNodeCommand,
  RemoveNodeCommand,
  GetContentNodeCommand,
  SetContentNodeCommand,
  GetAttrNodeCommand,
  SetAttrNodeCommand,
  GetValueNodeCommand,
  SetValueInputCommand,

  NodeListenerCommand,
  TriggerNodeCommand,

  //LoadScriptCommand,
  // TableCommand,
  OpenNewTabCommand,
  GetAllTabsCommand,
  PushNotificationCommand,
  //ViewCommand
  NetRulesCommand,
];

if (BROWSER === 'chrome') {
  commands.push(TTSSpeakCommand);
}

const mapCommand = (command) => {
  command.as = command.as || SCHEME_AS.COMMAND;
  command.hidden = command.hidden || false;

  if (command.permissions) {
    permissionsMap.set(command.scheme.type, command.permissions);
  }

  return [command.scheme.type, command];
};

export const controlsMap = new Map(commands.map(mapCommand));

