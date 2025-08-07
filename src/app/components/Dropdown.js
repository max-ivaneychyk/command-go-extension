import {useMemo} from 'react'
import {useFormContext} from "react-hook-form";
import Popper from "./Poper";
import React from 'react';
import {Button} from "rsuite";
import Remove from "./Remove";
import {useIncreaseHistoryVersion} from "../hooks/useIncreseHistoryVersion";

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const render = ({name}) => {
  return name;
}
const getKey = ({id}) => {
  return id;
}

export const Select = ({
                         options,
                         label,
                         color = 'badge badge-blue',
                         setValue,
                         value,
                         onClickHeader,
                         renderItem = render,
                         getItemKey = getKey,
                         onClear = () => null,
                         buttonClass = '',
                         defaultText = "--",
                         allowClear = false,
                         footer = null,
                         listClassName = 'max-h-[240px] max-w-[240px]'
                       }) => {

  const selected = useMemo(() => {
    return options.find(({id}) => id === value)
  }, [options, value]);

  return (
    <>
      <span>{label}</span>
      <Popper
        closeOnClick
        content={
          <div className={`overflow-y-auto ${listClassName} `}>
            {
              options.map((item) => {
                const {id} = item;
                const active = id === selected?.id;

                return (
                  <button
                    key={getItemKey(item)}
                    type={'button'}
                    className={'w-full text-left '}
                    onClick={() => setValue(id)}>
                    <p
                      className={classNames(
                        active ? ' !bg-blue-50 dark:!bg-transparent dark:!text-[#0179ff] !text-blue-700 ' : 'text-gray-700',
                        'inline-flex w-full px-2 py-1.5 text-[11px] truncate dark:!bg-transparent dark:text-white dark:hover:!text-[#0179ff] hover:bg-gray-100 hover:text-gray-900 cursor-pointer '
                      )}
                    >
                      {renderItem(item)}
                    </p>

                  </button>
                )
              })
            }
            {footer}
          </div>

        }
      >
        <div className={'relative group inline leading-default text-gray-900'}>
          <Button
            onClick={onClickHeader}
            type={'button'}
            className={`inline px-0.5 text-default leading-default text-gray-900 ${buttonClass} ${color} ${selected?.className}`}>
            {selected?.view || selected?.name || defaultText}
          </Button>
          {
            allowClear &&
            selected?.name &&
            <Remove
              onClick={(event) => {
                event.stopPropagation();
                setValue("");
                onClear();
              }}>
            </Remove>
          }
        </div>
      </Popper>
    </>
  )
}
export default function Dropdown({
                                   options,
                                   buttonClass,
                                   label,
                                   color,
                                   name,
                                   footer = null,
                                   defaultText,
                                   allowClear,
                                   onClear,
                                   renderItem,
                                   onSetValue = () => null
                                 }) {
  const {setValue, watch} = useFormContext();
  const value = watch(name); // you can supply default value as second argument
  const updateVersion = useIncreaseHistoryVersion();

  return (
    <Select
      onClear={onClear}
      allowClear={allowClear}
      buttonClass={buttonClass}
      value={value}
      footer={footer}
      color={color}
      renderItem={renderItem}
      label={label}
      options={options}
      defaultText={defaultText}
      setValue={id => {
        setValue(name, id, {shouldDirty: true, shouldTouch: true})
        onSetValue(id);
        updateVersion();
      }}
    />
  )
}
