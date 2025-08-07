import DelayCommand from "./commands/Delay.run";
import LogCommand from "./commands/Log.run";
import FetchCommand from "./commands/network/Fetch.run";
import InitVariableCommand from "./commands/Variable.run";
import FindNodeCommand from "./commands/element/FindNode.run";
import ForEachCommand from "./commands/loops/ForOf.run";
import IFCommand from "./commands/conditions/If.run";
import MapperCommand from "./commands/Mapper.run";
import CSSCodeCommand from "./commands/code/CodeCSS.run";
import InjectCodeCommand from "./commands/code/CodeJS.run";
import FunctionCommand from "./commands/code/Function.run";
import CallFunctionCommand from "./commands/code/CallFunction.run";
import OpenNewTabCommand from "./commands/tabs/OpenTab.run";
import GetAllTabsCommand from "./commands/tabs/GetAllTabs.run";
import CreateNodeCommand from "./commands/element/NodeCreate.run";
import RemoveNodeCommand from "./commands/element/RemoveNode.run";
import JSONCommand from "./commands/utils/JSON.run";
import AppendNodeCommand from "./commands/element/AppendNode.run";
import SetContentNodeCommand from "./commands/element/SetContentNode.run";
import SetAttrNodeCommand from "./commands/element/SetAttrNode.run";
import NodeListenerCommand from "./commands/element/NodeEventListener.run";
import GetDataFromDBCommand from "./commands/indexDb/GetFromDB.run";
import WriteDataToDBCommand from "./commands/indexDb/WriteDataToDB.run";
import GetAttrNodeCommand from "./commands/element/GetAttrNode.run";
import GetContentNodeCommand from "./commands/element/GetContentNode.run";
import GetValueNodeCommand from "./commands/element/GetValueInput.run";
import SetValueInputCommand from "./commands/element/SetValueInput.run";
import CommentCommand from "./commands/Comment.run";
import GetKeysFromDBCommand from "./commands/indexDb/GetKeysFromDB.run";
import TriggerNodeCommand from "./commands/element/NodeTrigger.run";
import GetEntriesFromDBCommand from "./commands/indexDb/GetEntriesFromDB.run";
import GetValuesFromDBCommand from "./commands/indexDb/GetValuesFromDB.run";
import RemoveDataFromDBCommand from "./commands/indexDb/RemoveFromDB.run";
import PushNotificationCommand from "./commands/PushNotification.run";
import GroupCommand from "./commands/Group.run";
import InitGlobalVariableCommand from "./commands/internal/GlobalVariable.run";
import ObjectUtilsCommand from "./commands/utils/ObjectUtils.run";
import MathUtilsCommand from "./commands/utils/MathUtils.run";
import IFTernaryCommand from "./commands/conditions/IfTernary.run";
import ArrayUtilsCommand from "./commands/utils/ArrayUtils.run";
import RedirectCommand from "./commands/Redirect.run";
import ArrayMapCommand from "./commands/loops/Array.prototype.map.run";
import ArrayFilterCommand from "./commands/loops/Array.prototype.filter.run";
import ArrayFindCommand from "./commands/loops/Array.prototype.find.run";
import ArrayEveryCommand from "./commands/loops/Array.prototype.every.run";
import ArraySomeCommand from "./commands/loops/Array.prototype.some.run";
import SetValueCommand from "./commands/Set.run";
import TemplateCommand from "./commands/code/Template.run";
import CallNativeFunctionCommand from "./commands/code/CallNativeFunction.run";
// import NetRulesRun from "./network.commands/NetRules.run";
import {COMMANDS} from "./const/commands";
import {runScripsMap} from "./classes/Scenario";
import TTSSpeakCommand from "./commands/tts/TTSSpeak.run";
import IFEarlyCommand from "./commands/conditions/IfEarly.run";


const entries = [
  // Hidden Internal Commands
  [COMMANDS.INIT_GLOBAL_VARIABLE, InitGlobalVariableCommand],
  // Logic
  [COMMANDS.INIT_VARIABLE, InitVariableCommand],
  [COMMANDS.FOR_EACH, ForEachCommand],
  [COMMANDS.IF, IFCommand],
  [COMMANDS.IF_EARLY, IFEarlyCommand],
  [COMMANDS.IF_TERNARY, IFTernaryCommand],
  // Functions
  [COMMANDS.FUNC, FunctionCommand],
  [COMMANDS.CALL_FUNC, CallFunctionCommand],
  [COMMANDS.CALL_NATIVE_FUNC, CallNativeFunctionCommand],
  // CallNextScenarioCommand,
  [COMMANDS.GROUP, GroupCommand],
  [COMMANDS.CODE, InjectCodeCommand],
  [COMMANDS.TEMPLATE, TemplateCommand],
  // Network
  [COMMANDS.FETCH, FetchCommand],
  // Utils
  [COMMANDS.OBJECT_UTILS, ObjectUtilsCommand],
  [COMMANDS.JSON, JSONCommand],
  [COMMANDS.ARRAY_UTILS, ArrayUtilsCommand],
  [COMMANDS.ARRAY_MAP, ArrayMapCommand],
  [COMMANDS.ARRAY_FILTER, ArrayFilterCommand],
  [COMMANDS.ARRAY_FIND, ArrayFindCommand],
  [COMMANDS.ARRAY_EVERY, ArrayEveryCommand],
  [COMMANDS.ARRAY_SOME, ArraySomeCommand],
  [COMMANDS.MATH_UTILS, MathUtilsCommand],

  // "Navigation",
  [COMMANDS.REDIRECT, RedirectCommand],
  // Timers
  [COMMANDS.DELAY, DelayCommand],
  // Mapper
  [COMMANDS.MAPPER, MapperCommand],
  //
  [COMMANDS.SET, SetValueCommand],
  // Styles
  [COMMANDS.CSS, CSSCodeCommand],

  [COMMANDS.LOG, LogCommand],

  [COMMANDS.COMMENT, CommentCommand],

  [COMMANDS.GET_FROM_DB, GetDataFromDBCommand],
  [COMMANDS.GET_KEYS_FROM_DB, GetKeysFromDBCommand],
  [COMMANDS.GET_VALUES_FROM_DB, GetValuesFromDBCommand],
  [COMMANDS.GET_ENTRIES_FROM_DB, GetEntriesFromDBCommand],
  [COMMANDS.WRITE_TO_DB, WriteDataToDBCommand],
  [COMMANDS.REMOVE_FROM_DB, RemoveDataFromDBCommand],

  [COMMANDS.CREATE_NODE, CreateNodeCommand],
  [COMMANDS.FIND_NODE, FindNodeCommand],
  [COMMANDS.APPEND_NODE, AppendNodeCommand],
  [COMMANDS.REMOVE_NODE, RemoveNodeCommand],
  [COMMANDS.GET_INNER_HTML_NODE, GetContentNodeCommand],
  [COMMANDS.INNER_HTML_NODE, SetContentNodeCommand],
  [COMMANDS.GET_ATTRIBUTE_NODE, GetAttrNodeCommand],
  [COMMANDS.SET_ATTRIBUTE_NODE, SetAttrNodeCommand],
  // Inputs
  [COMMANDS.GET_VALUE_OF_INPUT, GetValueNodeCommand],
  [COMMANDS.SET_VALUE_TO_INPUT, SetValueInputCommand],

  [COMMANDS.NODE_EVENT, NodeListenerCommand],
  [COMMANDS.NODE_TRIGGER, TriggerNodeCommand],

  [COMMANDS.OPEN_TAB, OpenNewTabCommand],
  [COMMANDS.GET_ALL_TABS, GetAllTabsCommand],
  [COMMANDS.PUSH_NOTIFICATION, PushNotificationCommand],
  [COMMANDS.TTS_SPEAK, TTSSpeakCommand],
];

entries.forEach(([key, value]) => runScripsMap.set(key, value))
