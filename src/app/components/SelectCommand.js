import {Drawer} from 'rsuite';
import React, {Fragment, useState} from "react";
import {classNames} from "./Dropdown";
import {SCHEME_AS} from "../const/scheme";

const SelectCommands = ({options, selected, onSelect, as}) => {
  const [openWithHeader, setOpenWithHeader] = useState(false);
  const [search, setSearch] = useState('');

  const close = () => {
    setOpenWithHeader(false);
    setSearch('');
  };

  const visibleOptions = options.filter(({hidden, as: asType, name}) => {
    if (hidden || asType !== as) return false;
    if (!search.trim()) return true;
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <button
        type={'button'}
        className={'badge badge-blue text-default leading-default inline-flex items-center cursor-pointer !mx-0'}
        onClick={() => setOpenWithHeader(true)}>
        + {as !== SCHEME_AS.USER_SCRIPT ? "Command" : "Script"}
      </button>

      <Drawer open={openWithHeader} onClose={close}>
        <Drawer.Header>
          <Drawer.Title className={'dark:text-white'}> Select Next Command </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <input
            autoFocus
            type={'text'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={'Search commands...'}
            className={'w-full mb-3 px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-white outline-none focus:border-blue-400'}
          />
          {visibleOptions.length === 0 && (
            <p className={'text-sm text-gray-400 text-center py-4'}>No commands match "{search}"</p>
          )}
          {
            visibleOptions.map(({name: property, id, icon = null, group}, index) => {
              const prevGroup = index > 0 ? visibleOptions[index - 1].group : null;
              const showGroup = group && group !== prevGroup;

              return (
                <Fragment key={id}>
                  {showGroup && <p className={'mt-3 mb-1 w-full uppercase'}>{group}</p>}

                  <button
                    type={'button'}
                    className={'w-full text-left '}>

                    <div
                      onClick={() => {
                        onSelect(id);
                        close();
                      }}
                      className={classNames(
                        'text-gray-700 dark:text-white hover:text-[#0179ff]',
                        'inline-flex py-1.5 text-[11px] truncate cursor-pointer w-full items-center'
                      )}
                    >
                      <div className={'mr-4'}>{icon}</div>
                      <p>{property}</p>
                    </div>
                  </button>
                </Fragment>
              )
            })
          }
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default SelectCommands
