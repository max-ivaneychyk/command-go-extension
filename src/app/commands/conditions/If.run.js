import {getSourceValue} from "../../funcs/variables";

const CONDITION = {
  TRUE: 'true',
  FALSE: 'false',
  MORE_EQ: 'more_eq',
  MORE: 'more',
  LESS: "less",
  LESS_EQ: "less_eq",
  EQUAL: "equal",
  NOT_EQUAL: "not_equal",
};

const SEPARATOR = {
  AND: '&&',
  OR: '||',
};

const checks = {
  [CONDITION.TRUE]: input => !!input,
  [CONDITION.FALSE]: input => !input,
  [CONDITION.MORE]: (input, sec) => input > sec,
  [CONDITION.MORE_EQ]: (input, sec) => input >= sec,
  [CONDITION.LESS]: (input, sec) => input < sec,
  [CONDITION.LESS_EQ]: (input, sec) => input <= sec,
  [CONDITION.EQUAL]: (input, sec) => input === sec,
  [CONDITION.NOT_EQUAL]: (input, sec) => input !== sec,
};

export const calcBool = ({conditions, getProperty}) => {
  // no options
  if (!conditions.length) return false;

  const ORs = []
  let group = [];

  for (let {arguments: args, condition, separator: nextSymbol} of conditions) {
    const [arg1, arg2] = args;
    const isTrue = checks[condition](
      getSourceValue(arg1, {getProperty}),
      getSourceValue(arg2, {getProperty}),
    );

    group.push(isTrue);

    if(nextSymbol === SEPARATOR.OR) {
      ORs.push(group);
      group = [];
    }
  }

  if(group.length) {
    ORs.push(group);
  }

  // all passed
  return ORs.some(bools => !bools.includes(false));
}



const run = async ({ifs, else_commands}, {getProperty, call, ctx}) => {
  const ifCommands = ifs.find(({conditions}) => calcBool({conditions, getProperty}));
  const $else = else_commands || [];
  const $commands = !!ifCommands ? ifCommands.commands : $else;
  const $ctx = ctx;

  await call({$commands, $ctx})
}

export default run
