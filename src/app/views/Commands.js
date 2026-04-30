import React, {useState} from 'react';
import {Commands} from '../containers/Commands';
import {FormCommands} from '../containers/FormCommands';
import {SCENARIO_EXECUTION_MODE, SCHEME_AS} from '../const/scheme';
import {Triggers} from '../triggers';
import Toggle from '../components/Toggle';
import {useForm} from 'react-hook-form';
import Tag from '../components/Tag';
import Hint from '../components/InfoHint';
import CatchError from "../components/CatchError";
import VersionSelector from '../components/VersionSelector';

const CommandsView = ({onGoBack, Executor, values, focused}) => {
  const [debug, setDebug] = useState(false);

  const methods = useForm({
    values,
  });

  const onChangeDebug = (bool) => {
    setDebug(bool);
  };

  return (
    <FormCommands
      focused={focused}
      debug={debug}
      Executor={Executor}
      values={values}
      methods={methods}
      onGoBack={onGoBack}
    >
      <VersionSelector />
      <Triggers/>

      <CatchError>
        <Commands
          as={SCHEME_AS.COMMAND}
          label={
            <div className={'flex justify-between items-center mr-4'}>
              <div className={'flex items-center'}>
                <Tag>
                  {
                    values.$$executionIn === SCENARIO_EXECUTION_MODE.BG
                      ? 'Background Commands'
                      : 'Content Page Commands'
                  }
                  <Hint
                    hint={
                      values.$$executionIn === SCENARIO_EXECUTION_MODE.BG
                        ? 'Background mode allows an extension to run tasks continuously in the background, even without an open window. It handles events, stores data, and communicates with other parts of the extension'
                        : 'Content scripts run directly on web pages, letting the extension interact with page content. They can modify the page’s HTML, style, and respond to user actions.'
                    }
                  />
                </Tag>
              </div>
              <div>
                Debug: <Toggle enabled={!!debug} onToggle={onChangeDebug}/>
              </div>
            </div>
          }
        />
      </CatchError>
    </FormCommands>
  );
};

export default CommandsView;
