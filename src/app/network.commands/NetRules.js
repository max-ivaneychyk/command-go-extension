import React, {useEffect} from 'react';
import {ListStructure} from "../commands/Mapper";
import {
  dropdownOption, inputOption,
} from "../hooks/useSelectFrom";
import IconCommand, {ICON_COLOR} from "../components/IconCommand";
import {IoEarthOutline} from "react-icons/io5";
import {SCHEME_AS} from "../const/scheme";
import Input from "../components/Input";
import {useFormContext} from "react-hook-form";
import hooks from "./NetRules.hooks";
import run from './NetRules.run'
import Hint from "../components/InfoHint";
import LinkToDoc from "../components/LinkToDoc";

const MAX_ID = 200_000;

const operations = [
  {name: "Remove", id: "remove"},
  {name: "Set", id: "set"},
]

const scheme = {
  id: null,
  type: "NET_RULES",
  priority: 1,
  action: {
    type: "modifyHeaders",
    requestHeaders: [],
    responseHeaders: [],
  },
  condition: {
    urlFilter: "*://example.com/*", resourceTypes: ["main_frame", "sub_frame"]
  },
}

export const getInitialScheme = ({value = 'remove', as = dropdownOption.id} = {}) => {
  return {
    as,
    value
  }
}

const SetValue = ({name}) => {
  const {watch} = useFormContext()
  const value = watch(`${name}operation.value`); // you can supply default value as second argument

  if (value === 'set') return (
    <Input
      type={'text'}
      name={`${name}value`}
      placeholder={'Value'}
    />
  )

  return null;
}

const Control = ({name}) => {
  const {setValue, watch} = useFormContext();
  const toProps = {
    components: [dropdownOption],
    options: operations
  };

  const right = {
    props: toProps,
    title: "apply operation",
    getInitial: getInitialScheme
  }

  const left = {
    title: "To Header",
    props: {
      components: [inputOption],
    }
  }

  const id = watch(`${name}id`);
  // todo - validate here
  // todo - need to fix this part
  useEffect(() => {
    if (id && id < MAX_ID) return;
    const randomNumber = Math.floor(Math.random() * MAX_ID) + 1;
    setValue(`${name}id`, randomNumber, {shouldDirty: true, shouldTouch: true})
  }, [id, name, setValue]);

  return (
    <>
      Modify Headers - where urlFilter
      <Hint hint={
        <>More info about urlFilter <LinkToDoc href={'https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#url_filter_syntax'}> here</LinkToDoc>
        </>
      }
      /> is
      <Input
        type={'text'}
        name={`${name}condition.urlFilter`}
        placeholder={'*://example.com/*'}
      />
      <p>
        ID: <Input
        type={'number'}
        name={`${name}id`}
        max={MAX_ID}
        placeholder={'Uniq Number from 1 t0 200_000'}
      />
      </p>
      <p>Request:</p>
      <ListStructure
        name={`${name}action.requestHeaders`}
        from={'header'}
        to={'operation'}
        right={right}
        left={left}
        CustomNext={SetValue}
      />
      <p>Response:</p>
      <ListStructure
        name={`${name}action.responseHeaders`}
        from={'header'}
        to={'operation'}
        right={right}
        left={left}
        CustomNext={SetValue}
      />

    </>
  )
}


export const NetRulesCommand = {
  icon: <IconCommand Svg={IoEarthOutline} className={ICON_COLOR.BLUE}/>,
  Control,
  run,
  scheme,
  hooks,
  as: SCHEME_AS.NET,
  group: "Request",
}
