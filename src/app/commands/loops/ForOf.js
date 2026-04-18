import {useVariablesDropDown} from "../../hooks/useVariablesDropDown";
import {Commands} from "../../containers/Commands";
import {useCollapse} from "../../hooks/useCollapse";
import React from 'react';
import {SCHEME_KEYS} from "../../const/scheme";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import NestedView from "../../components/NestedView";
import run from "./ForOf.run";
import { GrIteration } from "react-icons/gr";
import {COMMANDS} from "../../const/commands";
import CommandInfo from "../../components/CommandInfo";

const scheme = {
  type: COMMANDS.FOR_EACH,
  commands: [],
  temp: '',
  k: '',
  fromVar: ``, // variableName
  saveTo: ``,
  [SCHEME_KEYS.SCOPED]: true
}

const Control = ({name}) => {
  const {jsx: dropDownJsx} = useVariablesDropDown({
    label: "",
    name: `${name}fromVar`
  });

  const {jsx: dropDownLocalItemJsx} = useVariablesDropDown({
    label: "",
    name: `${name}temp`
  });
  const {jsx: dropDownLocalItemIJsx} = useVariablesDropDown({
    label: "",
    name: `${name}k`
  });

  // const {jsx: dropDownResultJsx} = useVariablesDropDown({
  //   label: " ",
  //   name: `${name}saveTo`
  // });

  const collapse = useCollapse()

  return (
    <>
      <CommandInfo>
        Iterate over each item in a list <br/>
        -- <span className={'badge badge-grey'}>Item:</span> variable name for current item <br/>
        -- <span className={'badge badge-grey'}>Index:</span> variable name for current index <br/>
        -- <span className={'badge badge-grey'}>List:</span> the array variable to loop over
      </CommandInfo>
      {collapse.control}
      forEach of item {dropDownLocalItemJsx}, index {dropDownLocalItemIJsx} from list {dropDownJsx}
      {/*return {dropDownResultJsx}*/}
      {collapse.render(
        <NestedView>
          <Commands prefixName={name} nested/>
        </NestedView>
      )}
    </>
  )
}


export const ForEachCommand = {
  icon: <IconCommand Svg={GrIteration} className={ICON_COLOR.YELLOW}/>,
  Control,
  label: "For Of",
  run,
  scheme,
}

