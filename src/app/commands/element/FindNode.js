import Input from "../../components/Input";
import {useSaveResultTo} from "../../hooks/useSaveResultTo";
import React from 'react';
import Dropdown from "../../components/Dropdown";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import run from "./FindNode.run";
import {getInitialScheme, inputOption, useSelectFrom, variableOption} from "../../hooks/useSelectFrom";
import {useCollapse} from "../../hooks/useCollapse";
import {TEXT} from "../../const/messages";
import {TbTextScan2} from "react-icons/tb";
import {COMMANDS} from "../../const/commands";
import {SCENARIO_EXECUTION_MODE} from "../../const/scheme";
import CommandInfo from "../../components/CommandInfo";

const byCountList = [{name: "one", id: false}, {name: "all", id: true}]

const scheme = {
  type: COMMANDS.FIND_NODE,
  selector: getInitialScheme({
    as: inputOption.id,
    value: "form > button"
  }),
  saveTo: "",
  retrySeconds: 1,
  parent: getInitialScheme({
    as: variableOption.id,
    value: ""
  }),
  multi: false
}


const Control = ({name}) => {
  const {jsx: saveToJsx} = useSaveResultTo({name: `${name}saveTo`, text:""})
  const {jsx: selector} = useSelectFrom({
    group: `${name}selector`,
    placeholder: "button.btn"
  })
  const {jsx: parent} = useSelectFrom({
    group: `${name}parent`,
    components: [
      variableOption
    ]
  })
  const collapse = useCollapse()

  return (
    <>
      <CommandInfo>
        Find DOM element(s) by CSS selector <br/>
        -- <span className={'badge badge-grey'}>Selector:</span> CSS selector, e.g. <span className={'badge badge-blue'}>#myId</span> <span className={'badge badge-blue'}>.className</span> <span className={'badge badge-blue'}>div &gt; p</span> <br/>
        -- <span className={'badge badge-grey'}>Count:</span> one (first match) or all (NodeList) <br/>
        -- <span className={'badge badge-grey'}>Retry:</span> seconds to wait if element not found yet
      </CommandInfo>
      {collapse.control}
      Find
      <Dropdown
        options={byCountList}
        label={''}
        name={`${name}multi`}
      />
      element(s) by selector
      {selector}

      {TEXT.ASSIGN_TO}{saveToJsx}
      {collapse.render(
        <>
          retry seconds
          <Input
            type={"number"}
            placeholder={'0'}
            name={`${name}retrySeconds`}
          />
          parent element {parent}
        </>
      )}
    </>
  )
}


export const FindNodeCommand = {
  icon: <IconCommand Svg={TbTextScan2} className={ICON_COLOR.GREY}/>,
  Control,
  run,
  scheme,
  mode: SCENARIO_EXECUTION_MODE.CONTENT,
  label: "Find Element(s)"
}



