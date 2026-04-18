import Dropdown from "../../components/Dropdown";
import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import {ListStructure} from "../Mapper";
import {useCollapse} from "../../hooks/useCollapse";
import {
  componentOption,
  getInitialScheme,
  inputOption,
  useSelectFrom,
  variableOption
} from "../../hooks/useSelectFrom";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./Fetch.run";
import ExecuteIn from "../../components/ExecuteIn";
import {TEXT} from "../../const/messages";
import { IoEarthOutline } from "react-icons/io5";
import {COMMANDS} from "../../const/commands";
import CommandInfo from "../../components/CommandInfo";

const parseAsList = [
  {name: "json", id: "json"},
  {name: "text", id: "text"},
 // {name: "getReader", id: "getReader"},
]

const methods = [
  {name: "GET", id: "get"},
  {name: "POST", id: 'post'},
  {name: "PUT", id: 'put'},
  {name: "PATCH", id: 'patch'},
  {name: "DELETE", id: 'delete'},
];

const scheme = {
  type: COMMANDS.FETCH,
  method: "get",
  url: getInitialScheme({
    as: inputOption.id,
    value: `https://localhost:3000`
  }), // url
  parseAs: "json",
  saveTo: "",
  headers: [],
  sourceOfHeaders: {as: undefined, value: ""},
  main: false,
  body: undefined
}

const Control = ({name}) => {
  const {jsx: selectFromJsx} = useSelectFrom({
    label: "URL from",
    group: `${name}url`,
  })
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text:""})
  const {jsx: bodyJsx} = useSelectFrom({group: `${name}body`, placeholder: '{"key": "value"}'})
  const collapse = useCollapse()
  const {jsx: sourceOfHeaders, mode} = useSelectFrom({
    group: `${name}sourceOfHeaders`,
    label: "",
    components: [variableOption, componentOption]
  });

  return (
    <>
      <CommandInfo>
        HTTP request <br/>
        -- <span className={'badge badge-grey'}>Method:</span> GET, POST, PUT, PATCH, DELETE <br/>
        -- <span className={'badge badge-grey'}>URL:</span> endpoint address <br/>
        -- <span className={'badge badge-grey'}>Parse as:</span> json or text <br/>
        -- <span className={'badge badge-grey'}>Headers:</span> custom request headers (optional) <br/>
        -- <span className={'badge badge-grey'}>Body:</span> request payload for POST/PUT (optional)
      </CommandInfo>
      {collapse.control}
      Fetch
      <Dropdown
        options={methods}
        label={''}
        name={`${name}method`}
      />
      {selectFromJsx}
      parse response as
      <Dropdown
        options={parseAsList}
        label={''}
        name={`${name}parseAs`}
      />
      {TEXT.ASSIGN_TO}{saveToJsx}

      {collapse.render(
        <>
          Headers: {sourceOfHeaders}
          {!mode ? <ListStructure name={`${name}headers`} placeholder={'Origin'}/> : <div></div>}
          Body: {bodyJsx} <div/>
          <ExecuteIn name={name} />
        </>
      )}
    </>
  )
}


export const FetchCommand = {
  icon: <IconCommand Svg={IoEarthOutline} className={ICON_COLOR.BLUE}/>,
  Control,
  run,
  scheme,
  group: "Request",
}
