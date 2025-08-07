import {useFormContext} from "react-hook-form";
import Popper from "./Poper";
import React from 'react';
import {RiEditLine} from "react-icons/ri";
import {useIncreaseHistoryVersion} from "../hooks/useIncreseHistoryVersion";
import {replaceAllVariables} from "../funcs/variables";

function encodeHTMLEntities(text) {
  const replacements = [
    ['amp', '&'],
    ['apos', '\''],
    ['lt', '<'],
    ['gt', '>']
  ];

  if(typeof text !== 'string') return text;

  replacements.forEach(function(replace){
    text = text.replace(new RegExp(replace[1], 'g'), '&'+replace[0]+';');
  });

  return text;
}

const Input = ({
                 name,
                 readOnly,
                 onlyIcon = false,
                 type = "text",
                 placeholder,
                 max,
                 className = "badge badge-blue dark:border-none cursor-pointer break-all"
               }) => {
  const {register, watch, setFocus} = useFormContext();
  const value = watch(name);
  const Tag = type !== 'number' ? "textarea" : "input";
  const updateVersion = useIncreaseHistoryVersion();

  const replaceVars = str => {
    const format = (varName) => {
      return `<span class="text-yellow-800 contents">${varName}</span>`
    }

    const res = encodeHTMLEntities(str);

    if(typeof res !== 'string') return res;

    return res.replace(/\{\{\{?.+?\}?\}\}/g, (value) => {
      return format(value)
    })
  }

  const regProps = register(name);

  if (readOnly) return (
    <span className={className}>{value}</span>
  );

  return (
    <Popper
      content={
        <Tag
          type={type}
          max={max}
          placeholder={placeholder}
          {...regProps}
          onBlur={e => {
            regProps.onBlur(e);
            updateVersion();
          }}
          className="inline-flex w-[320px] min-h-[56px] badge-blue badge mb-0"
        />
      }
    >
      <span
        className={className}
        onClick={() => {
          setTimeout(() => {
            setFocus(name)
          }, 120)
        }}>
        {
          !onlyIcon &&
          <span
            className={'mr-0.5'}
            dangerouslySetInnerHTML={{
              __html: replaceVars(value || "?")
            }}
          />
        }
        {type === 'text' && <RiEditLine className={'ml-0.5 inline'}/>}
      </span>

    </Popper>
  )
}


export default Input
