import Validator from "../../validators/Validator";
import {Ctx, Scenario} from "../../classes/Scenario";

const run = async ({fromVar, commands, k, temp, saveTo, $id}, {getProperty, ctx, scope, call, setProperty, track}) => {
  const list = getProperty(fromVar);
  let res = []

  Validator.asArray(list, fromVar)

  let i = 0;
  for await (let item of list) {
    const localCtx = new Ctx(
      ctx,
      scope.getScope(
        Scenario.getInstrScopeName({$id})
      )
    );

    i++;

    try {
      localCtx.setProperty(temp, item);
      localCtx.setProperty(k, i - 1);

      track({id: $id, status: 0, message: `${i} of ${list.length}`})

      const data = await call({
        $commands: commands,
        $ctx: localCtx
      });

      res.push(data)
    } catch (e) {
      if (e.message === 'STOP') throw e;
      console.error(e)
    }
  }

  setProperty(saveTo, res)
}

export default run;
