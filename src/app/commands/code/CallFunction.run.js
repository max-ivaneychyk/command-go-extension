import {getSourceValue} from "../../funcs/variables";

export const callFunction = async ({arguments: args, saveTo, func}, {getProperty, call}) => {
  const notDeclaredFunction = [
    null, null, {}
  ];

  const [declaredFuncParams, commands, {
    setProperty: _setProperty,
    getProperty: _getProperty,
    scope,
    ctx,
    saveTo: _saveTo
  }] = getProperty(`FUNC:${func}`) ?? notDeclaredFunction;

  if (declaredFuncParams === null) {
    return Promise.reject({
      message: "Function is not defined or was declared after the call"
    })
  }

  declaredFuncParams.forEach((k, i) => {
    _setProperty(k.value, getSourceValue(args[i], {getProperty}))
  });

  await call({$commands: commands, $scope: scope, $ctx: ctx})

  return _getProperty(_saveTo);
}

const run = async (vars, utils) => {
  const {saveTo} = vars;
  const {setProperty} = utils;

  const result = await callFunction(vars, utils);

  setProperty(saveTo, result)
}

export default run;
