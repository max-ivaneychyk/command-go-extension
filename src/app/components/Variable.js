import {useVariablesDropDown} from "../hooks/useVariablesDropDown";


export const Variable = ({name}) => {
  const {jsx} = useVariablesDropDown({
    label: "",
    name
  });

  return jsx
}
