import { nanoid } from 'nanoid';
import { URLLoadTabTrigger } from '../triggers/LoadPage';
import { LOAD_URL_CONDITION } from '../const/triggers';
import { SCENARIO_EXECUTION_MODE, SCHEME_AS } from '../const/scheme';
import { latestVersion } from '../migrations';
import { BROWSER } from '../../chrome/const/support';

export const getInitialScheme = ({ name, href, schema, mode }) => ({
  $$uuid: nanoid(),
  $$schema: schema,
  $name: name,
  $$version: latestVersion,
  $$browser: BROWSER,
  $$updatedAt: Date.now(),
  $$executionIn: mode ?? SCENARIO_EXECUTION_MODE.UNKNOWN,
  $$scopes: {
    $$global: {
      $temp: '$temp',
      $$ref: null,
    },
    '$$scope:172': {
      $$ref: '$$global',
    },
  },
  commands:
    schema === SCHEME_AS.COMMAND && mode === SCENARIO_EXECUTION_MODE.CONTENT
      ? [
          {
            type: 'CSS',
            name: ' Red Background',
            immediately: true,
            value:
              '/* First css rule  */\n  body { background: red !important }\n  ',
            $id: 172,
          },
        ]
      : [],
  triggers:
    schema === SCHEME_AS.COMMAND && mode === SCENARIO_EXECUTION_MODE.CONTENT
      ? [
          {
            ...URLLoadTabTrigger.scheme,
            conditions: [
              {
                type: LOAD_URL_CONDITION.START,
                value: href ?? 'http://localhost',
              },
            ],
          },
        ]
      : [],
});
