

const run = async ({commands}, {call, ctx}) => {
  return await call({$commands: commands, $ctx: ctx})
}

export default run;
