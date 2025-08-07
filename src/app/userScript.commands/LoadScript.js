import Input from '../components/Input';
import React, { useEffect } from 'react';
import IconCommand, { ICON_COLOR } from '../components/IconCommand';
import { SCHEME_AS } from '../const/scheme';
import { useFormContext } from 'react-hook-form';
import { SCRIPT_RUN_AT, SCRIPT_WORLDS } from '../const/userScript';
import { FaJs } from 'react-icons/fa';
import { USER_SCRIPT_COMMANDS } from '../commands/code/save';
import hooks from './LoadScript.hooks';
import LinkToDoc from '../components/LinkToDoc';
import Hint from "../components/InfoHint";

const scheme = {
  type: USER_SCRIPT_COMMANDS.LOAD_SCRIPT_BY_SRC,
  src: '',
  $$formId: '',
  world: SCRIPT_WORLDS[0].id,
  runAt: SCRIPT_RUN_AT[0].id,
  matches: ['*://example.com/*'],
};

const run = () => null;

const Control = ({ name }) => {
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    setValue(`${name}$$formId`, getValues().$$uuid);
  }, [getValues, name, setValue]);

  return (
    <>
      Load script
      <Input placeholder={'https://script.js'} name={`${name}src`} />
      to matches
      <Input name={`${name}matches.0`} />{' '}
      <Hint
        hint={
          <>
            More info about matches{' '}
            <LinkToDoc
              href={
                'https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns'
              }
            >
              {' '}
              here
            </LinkToDoc>
          </>
        }
      />
    </>
  );
};

export const LoadScriptCommand = {
  icon: <IconCommand Svg={FaJs} className={ICON_COLOR.GREEN} />,
  Control,
  as: SCHEME_AS.USER_SCRIPT,
  label: 'Load Script By URL',
  run,
  hooks,
  scheme,
};
