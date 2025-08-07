import Dropdown from "../components/Dropdown";
import React from 'react';
import IconCommand, {ICON_COLOR} from "../components/IconCommand";
import WaitIcon from "../icons/wait";
import CommandInfo from "../components/CommandInfo";
import Code from "../components/Code";
import {getInitialScheme, inputOption, useSelectFrom} from "../hooks/useSelectFrom";
import run, {times} from "./Delay.run";
import {COMMANDS} from "../const/commands";

const scheme = {
  type: COMMANDS.DELAY,
  format: "ms", // variable
  delay: getInitialScheme({
    value: 40,
    as: inputOption.id
  }),
}

const Control = ({name}) => {
  const {jsx: bodyJsx} = useSelectFrom({
    group: `${name}delay`,
    placeholder: "40",
    inputType: 'number'
  })

  return (
    <>
      <CommandInfo>
        Wait time <br/>
        Properties: <br/>
        -- <span className={'badge badge-grey'}>Delay:</span> number <br/>
        -- <span className={'badge badge-grey'}>Time format:</span> minutes, seconds, milliseconds. <br/>
        Examples: <br/>
        -- Delay <span className={'badge badge-blue'}>4</span>
        <span className={'badge badge-blue'}>sec </span>
        <Code>
          {`await new Promise(resolve => setTimeout(resolve, 4 * 1000 ))`}
        </Code>
      </CommandInfo>

      Delay
      {bodyJsx}
      <Dropdown
        options={times}
        label={''}
        name={`${name}format`}
      />

    </>
  )
}

export const DelayCommand = {
  icon: <IconCommand Svg={WaitIcon} className={ICON_COLOR.GREY}/>,
  Control,
  run,
  scheme,
  group: "Timers",
  label: "Delay"
}


