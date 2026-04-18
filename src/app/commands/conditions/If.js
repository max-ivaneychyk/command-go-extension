import {Commands} from "../../containers/Commands.jsx";
import {useCollapse} from "../../hooks/useCollapse";
import React, {Fragment} from 'react';
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import IfIcon from "../../icons/if";
import NestedView from "../../components/NestedView";
import Conditions, {getInitialModel} from "../../components/Condition";
import {useFieldArray, useFormContext} from "react-hook-form";
import {IoMdAdd} from "react-icons/io";
import Remove from "../../components/Remove";
import run from './If.run'
import {COMMANDS} from "../../const/commands";
import Syntax from "../../components/Syntax";
import CommandInfo from "../../components/CommandInfo";

const scheme = {
  type: COMMANDS.IF,
  ifs: [
    {
      conditions: [
        {...getInitialModel()}
      ],
      commands: [],
    }
  ],
  else_commands: [],
}


const IfItem = ({name, isFirst, onRemove, children, collapse}) => {

  return (
    <>
      <span className={'group relative'}>
        <Syntax>{isFirst ? "If" : 'Else If'}</Syntax> {!isFirst && <Remove onClick={onRemove}/>}
      </span> (<Conditions prefixName={name}/>)  {!isFirst && !collapse.visible && "..."}  {children}
      {
        collapse.render(
          <NestedView>
            <Commands prefixName={name} nested/>
          </NestedView>
        )
      }
    </>
  )
}

const Control = ({name}) => {
  const collapse = useCollapse()
  const {control} = useFormContext();
  const {fields, append, remove} = useFieldArray({
    control,
    name: `${name}ifs`
  });

  return (
    <>
      <CommandInfo>
        Conditional branching <br/>
        -- Add conditions with <span className={'badge badge-blue'}>AND</span> / <span className={'badge badge-blue'}>OR</span> logic <br/>
        -- Use <span className={'badge badge-blue'}>+ else if</span> for additional branches <br/>
        -- <span className={'badge badge-grey'}>Else</span> block runs when no conditions match
      </CommandInfo>
      {collapse.control}
      {
        fields.map((item, index) => {
            const isFirst = index === 0;
            return (
              <Fragment key={item.id}>
                <IfItem
                  isFirst={isFirst}
                  collapse={collapse}
                  name={`${name}ifs.${index}.`}
                  onRemove={() => remove(index)}>

                  {
                    isFirst && <button
                      type={'button'}
                      onClick={() => {
                        append({
                          conditions: [
                            {...getInitialModel()}
                          ],
                          commands: [],
                        })
                      }}
                      className=" badge badge-blue ml-0.5">
                      <IoMdAdd className={'inline'}/> else if
                    </button>
                  }
                </IfItem>
              </Fragment>
            )
          }
        )}

      <div className={'mt-1 inline-block'}><Syntax>Else</Syntax> {!collapse.visible && "..."}</div>
      {collapse.render(
        <NestedView>
          <Commands prefixName={name + "else_"} nested/>
        </NestedView>
      )}
    </>
  )
}


export const IFCommand = {
  icon: <IconCommand Svg={IfIcon} className={ICON_COLOR.GREY}/>,
  Control,
  label: "If/Else",
  run,
  scheme,
}

