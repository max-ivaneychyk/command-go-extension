import DelayCommand from "./commands/Delay.run";
import FetchCommand from "./commands/network/Fetch.run";
import InitVariableCommand from "./commands/Variable.run";
import ForEachCommand from "./commands/loops/ForOf.run";
import IFCommand from "./commands/conditions/If.run";
import IFEarlyCommand from "./commands/conditions/IfEarly.run";
import MapperCommand from "./commands/Mapper.run";
import FunctionCommand from "./commands/code/Function.run";
import CallFunctionCommand from "./commands/code/CallFunction.run";
import OpenNewTabCommand from "./commands/tabs/OpenTab.run";
import JSONCommand from "./commands/utils/JSON.run";
import GetDataFromDBCommand from "./commands/indexDb/GetFromDB.run";
import WriteDataToDBCommand from "./commands/indexDb/WriteDataToDB.run";
import CommentCommand from "./commands/Comment.run";
import GetKeysFromDBCommand from "./commands/indexDb/GetKeysFromDB.run";
import GetEntriesFromDBCommand from "./commands/indexDb/GetEntriesFromDB.run";
import GetValuesFromDBCommand from "./commands/indexDb/GetValuesFromDB.run";
import RemoveDataFromDBCommand from "./commands/indexDb/RemoveFromDB.run";
import PushNotificationCommand from "./commands/PushNotification.run";
import GroupCommand from "./commands/Group.run";
import ObjectUtilsCommand from "./commands/utils/ObjectUtils.run";
import MathUtilsCommand from "./commands/utils/MathUtils.run";
import IFTernaryCommand from "./commands/conditions/IfTernary.run";
import ArrayUtilsCommand from "./commands/utils/ArrayUtils.run";
import ArrayMapCommand from "./commands/loops/Array.prototype.map.run";
import ArrayFilterCommand from "./commands/loops/Array.prototype.filter.run";
import ArrayFindCommand from "./commands/loops/Array.prototype.find.run";
import ArrayEveryCommand from "./commands/loops/Array.prototype.every.run";
import ArraySomeCommand from "./commands/loops/Array.prototype.some.run";
import SetValueCommand from "./commands/Set.run";
import {COMMANDS} from "./const/commands";
import {runScripsMap} from "./classes/Scenario";
import TemplateCommand from "./commands/code/Template.run";
import GetAllTabsCommand from "./commands/tabs/GetAllTabs.run";
import TTSSpeakCommand from "./commands/tts/TTSSpeak.run";
import CallNativeFunctionCommand from "./commands/code/CallNativeFunction.run";


const entries = [
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
  [COMMANDS.GROUP, GroupCommand],
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
  // Timers
  [COMMANDS.DELAY, DelayCommand],
  // Mapper
  [COMMANDS.MAPPER, MapperCommand],
  //
  [COMMANDS.SET, SetValueCommand],

  [COMMANDS.COMMENT, CommentCommand],

  [COMMANDS.GET_FROM_DB, GetDataFromDBCommand],
  [COMMANDS.GET_KEYS_FROM_DB, GetKeysFromDBCommand],
  [COMMANDS.GET_VALUES_FROM_DB, GetValuesFromDBCommand],
  [COMMANDS.GET_ENTRIES_FROM_DB, GetEntriesFromDBCommand],
  [COMMANDS.WRITE_TO_DB, WriteDataToDBCommand],
  [COMMANDS.REMOVE_FROM_DB, RemoveDataFromDBCommand],

  [COMMANDS.OPEN_TAB, OpenNewTabCommand],
  [COMMANDS.GET_ALL_TABS, GetAllTabsCommand],
  [COMMANDS.PUSH_NOTIFICATION, PushNotificationCommand],
  [COMMANDS.TTS_SPEAK, TTSSpeakCommand],
];

entries.forEach(([key, value]) => runScripsMap.set(key, value))
