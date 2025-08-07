

const run = async ({commands, func, arguments: args, saveTo}, {setProperty, scope, ctx, getProperty}) => {
  setProperty(`FUNC:${func}`, [args, commands, {setProperty, scope, getProperty, saveTo, ctx}])
}

export default run;
