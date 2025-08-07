import { Switch } from '@headlessui/react'
import React, {Fragment} from 'react'
import {classNames} from "./Dropdown";

export default function Toggle({enabled, onToggle, className, small, as = 'button', disabled}) {
  const Tag = as;
  return (
    <Switch checked={enabled} onChange={onToggle} as={Fragment} disabled={disabled}>
      {({ checked}) => (
        <Tag
          type={'button'}
          className={classNames(
            className,
            'group inline-flex h-5 w-10 items-center rounded-full transition-colors ',
            small && `scale-[0.8]`,
            checked ? 'bg-blue-600' : 'bg-gray-400',
            disabled && 'cursor-not-allowed grayscale-[0.8]'
          )}
        >
          <span
            className={classNames('w-3 h-3 rounded-full bg-white transition', checked ? 'translate-x-6' : 'translate-x-1', ' ')}
          />
        </Tag>
      )}
    </Switch>
  )
}
