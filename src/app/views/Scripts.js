import React from 'react';
import {Commands} from "../containers/Commands";
import {useForm} from "react-hook-form";
import {SCHEME_AS} from "../const/scheme";
import {FormUserScripts} from "../containers/FormUserScripts";
import Tag from "../components/Tag";
import VersionSelector from '../components/VersionSelector';

const Scripts = ({onGoBack, Executor, values, focused}) => {
  const methods = useForm({
    values,
  });

  return (
    <FormUserScripts
      focused={focused}
      Executor={Executor}
      values={values}
      methods={methods}
      onGoBack={onGoBack}
    >
      <VersionSelector />
      <Commands
        as={SCHEME_AS.USER_SCRIPT}
        label={
          <div className={'flex justify-between items-center mr-4 mt-[7px]'}>
            <Tag>UserScripts: </Tag>
          </div>
        }
      />
    </FormUserScripts>
  )
}


export default Scripts;
