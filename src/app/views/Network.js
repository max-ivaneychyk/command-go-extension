import React from 'react';
import {FormNetwork} from "../containers/FormNetwork";
import {useForm} from "react-hook-form";
import {Commands} from "../containers/Commands";
import {SCHEME_AS} from "../const/scheme";
import Hint from "../components/InfoHint";
import Tag from "../components/Tag";
import VersionSelector from '../components/VersionSelector';
const Network = ({onGoBack, Executor, values, focused}) => {
  const methods = useForm({
    values,
  });

  return (
    <FormNetwork
      focused={focused}
      Executor={Executor}
      values={values}
      methods={methods}
      onGoBack={onGoBack}
    >
      <VersionSelector />

      <Commands
        as={SCHEME_AS.NET}
        label={
          <div className={'flex justify-between items-center mr-4 mt-[7px]'}>
            <div>
              <Tag>Network Overrides
                <Hint
                  hint={'Unfortunately, Network Override headers are not showing in the browser devtools, making it quite tricky to debug headers.'}/>
              </Tag>
          </div>
          </div>
        }
      />
    </FormNetwork>
  )
}


export default Network


