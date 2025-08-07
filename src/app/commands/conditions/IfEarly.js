import React, {Fragment} from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import IfIcon from "../../icons/if";
import Conditions, {getInitialModel} from "../../components/Condition";
import {useFieldArray, useFormContext} from "react-hook-form";
import run from './IfEarly.run'
import {COMMANDS} from "../../const/commands";
import Syntax from "../../components/Syntax";
import Return from "../../components/Return";

const scheme = {
  type: COMMANDS.IF_EARLY,
  ifs: [
    {
      conditions: [
        {...getInitialModel()}
      ],
    }
  ]
}


const IfItem = ({name}) => {
  return (
    <>
      <span className={'group relative'}> <Syntax>If</Syntax> </span> (<Conditions prefixName={name}/>) <Return/>
    </>
  )
}

const Control = ({name}) => {
  const {control} = useFormContext();
  const {fields} = useFieldArray({
    control,
    name: `${name}ifs`
  });

  return (
    <>
      {
        fields.map((item, index) => {
            return (
              <Fragment key={item.id}>
                <IfItem
                  name={`${name}ifs.${index}.`}>
                </IfItem>
              </Fragment>
            )
          }
        )}
    </>
  )
}


export const IFEarlyReturnCommand = {
  icon: <IconCommand Svg={IfIcon} className={ICON_COLOR.GREY}/>,
  Control,
  label: "If - Early return",
  run,
  scheme,
}

