import {EARLY_RETURN_KEYWORD, SCHEME_KEYS} from "../const/scheme";
import {isSkipped} from "../funcs/optional";
import {READ_ONLY_VARS, READ_ONLY_VARS_VALUES} from "../const/readOnlyVars";

export const STATUS = {
  PENDING: 0,
  FAIL: -1,
  DONE: 1,
  SKIPPED: 2,
}

export const runScripsMap = new Map();

export class Ctx {
  constructor(parentRef = null, initialScope = {}) {
    this.scope = structuredClone(initialScope) || {};
    this.parent = parentRef;
  }

  _getProperty(key) {
    if (Object.hasOwn(this.scope, key) || !this.parent) {
      return {value: this.scope[key], scope: this.scope}
    }

    return this.parent._getProperty(key)
  }

  setProperty(key, value) {
    if(!key)return;
    if(READ_ONLY_VARS[key])throw new Error(`${key} is readonly property`);

    const {scope} = this._getProperty(key);
    scope[key] = value;

    console.info("DEBUG:", "Write:", JSON.stringify(key), value)
  }

  getProperty(key) {
    if(!key)return;
    if(READ_ONLY_VARS[key])return READ_ONLY_VARS_VALUES[key]();

    const value = this._getProperty(key).value
    console.info("DEBUG:", "Read:", JSON.stringify(key), value)
    return value
  }
}


export class Scenario {
  static cleanUp = () => null;

  constructor(instructions, ctx = new Ctx()) {
    this.instructions = instructions;
    this.track = () => null;
    this.ctx = ctx
  }

  static getInstrScopeName(instr) {
    return `$$scope:${instr.$id}`;
  }

  onTrack(func) {
    this.track = func;
    return this
  }

  async execute(scope) {

    const call = this.call = this.call || (async ({$commands = [], $scope = scope, $ctx}) => {
      const sc = new Scenario($commands, $ctx)
        .onTrack(this.track);

      sc.call = call;

      await sc.execute($scope);
    });


    for await (let instr of this.instructions) {
      const commandFn = runScripsMap.get(instr.type);

      if(isSkipped(instr)) {
        this.track({id: instr.$id, status: STATUS.SKIPPED});
        continue;
      }

      try {
        this.track({id: instr.$id, status: STATUS.PENDING});

        const scopeName = Scenario.getInstrScopeName(instr);

        const localCtx = instr[SCHEME_KEYS.SCOPED] ?
          new Ctx(
            this.ctx,
            scope.getScope(scopeName)
          ) :
          this.ctx;

        const getProperty = key => {
          return localCtx.getProperty(key);
        }
        const setProperty = (key, val) => {
          return localCtx.setProperty(key, val);
        }

        const result = await commandFn(instr, {
          getProperty,
          setProperty,
          ctx: localCtx,
          scope,
          call,
          track: this.track
        });


        if(result === EARLY_RETURN_KEYWORD)break;

        this.track({id: instr.$id, status: STATUS.DONE})
      } catch (e) {
        this.track({id: instr.$id, status: STATUS.FAIL, message: e?.message ?? e?.toString()})
        return Promise.reject(e)
      }
    }
  }
}
