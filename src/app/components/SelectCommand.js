import {Drawer, ButtonToolbar, Button} from 'rsuite';
import React, {Fragment, useState} from "react";
import {classNames} from "./Dropdown";
import {SCHEME_AS} from "../const/scheme";

const SelectCommands = ({options, selected, onSelect, as}) => {
  const [openWithHeader, setOpenWithHeader] = useState(false);

  return (
    <>
      <ButtonToolbar>
        <Button
          className={'badge badge-blue text-default leading-default'}
          onClick={() => setOpenWithHeader(true)}>
          + {as !== SCHEME_AS.USER_SCRIPT ? "Command" : "Script"}
        </Button>
      </ButtonToolbar>

      <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
        <Drawer.Header>
          <Drawer.Title className={'dark:text-white'}> Select Next Command </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          {
            options.map(({name: property, id, icon = null, group, hidden, as: asType}) => {
              const active = id === selected?.id;

              if (hidden || asType !== as) return null;

              return (
                <Fragment key={id}>
                  {group && <p className={'mt-3 mb-1 w-full uppercase'}>{group}</p>}

                  <button
                    type={'button'}
                    className={'w-full text-left '}>

                    <div
                      onClick={() => {
                        onSelect(id);
                        setOpenWithHeader(false)
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
