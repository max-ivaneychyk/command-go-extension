import Dropdown from "./Dropdown";
import React, {Fragment} from "react";
import {useVariablesDropDown} from "../hooks/useVariablesDropDown";
import {useFieldArray, useFormContext} from "react-hook-form";
import {variableOption} from "../hooks/useSelectFrom";
import {IoMdAdd} from "react-icons/io";

const CONDITION = {
  TRUE: 'true',
  FALSE: 'false',
  MORE_EQ: 'more_eq',
  MORE: 'more',
  LESS: "less",
  LESS_EQ: "less_eq",
  EQUAL: "equal",
  NOT_EQUAL: "not_equal",
};

const SEPARATOR = {
  AND: '&&',
  OR: '||',
};

const options = [
  {name: "is truly", id: CONDITION.TRUE},
  {name: "is falsy", id: CONDITION.FALSE},
  {name: ">", id: CONDITION.MORE},
  {name: "<", id: CONDITION.LESS},
  {name: ">=", id: CONDITION.MORE_EQ},
  {name: "<=", id: CONDITION.LESS_EQ},
  {name: "===", id: CONDITION.EQUAL},
  {name: "!==", id: CONDITION.NOT_EQUAL},
]

const separatorOptions = [
  {name: SEPARATOR.AND, id: SEPARATOR.AND},
  {name: SEPARATOR.OR, id: SEPARATOR.OR},
]

export const getInitialModel = () => {
  return {
    condition: CONDITION.EQUAL,
    separator: SEPARATOR.AND,
    arguments: [
      {value: "", as: variableOption.id},
      {value: "", as: variableOption.id}
    ]
  }
}

const Condition = ({name, onRemove}) => {
  const {jsx: dropDownJsx} = useVariablesDropDown({
    label: "",
    name: `${name}arguments.0.value`
  });
  const {jsx: secDropDownJsx} = useVariablesDropDown({
    label: "",
    name: `${name}arguments.1.value`
  });

  const {watch} = useFormContext();
  const conditionField = watch(`${name}condition`)

  return (
    <>
      {dropDownJsx}
      <Dropdown
        options={options}
        label={''}
        name={`${name}condition`}
        allowClear
        onClear={onRemove}
      />
      {
        conditionField &&
        ![CONDITION.TRUE, CONDITION.FALSE].includes(conditionField)
        && secDropDownJsx
      }
    </>
  )
}

const Conditions = ({prefixName}) => {
  const methods = useFormContext();
  const {control} = methods;
  const name = prefixName + "conditions";

  const {fields, append, remove} = useFieldArray({
    control,
    name
  });

  return (
    <div className={'pr-2 inline '}>
      {
        fields.map((item, index) => {
            return (
              <Fragment key={item.id}>
                <Condition
                  name={`${prefixName}conditions.${index}.`}
                  onRemove={() => remove(index)}>
                </Condition>
                {!!fields[index + 1] &&
                  <Dropdown
                    options={separatorOptions}
                    name={`${prefixName}conditions.${index}.separator`}/>
                }
              </Fragment>
            )
          }
        )}
      <button
        type={'button'}
        onClick={() => {
          append(getInitialModel())
        }}
        className=" badge badge-blue ml-0.5">
        <IoMdAdd className={'inline'}/>
      </button>
    </div>
  )
}

export default Conditions;
