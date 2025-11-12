import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import Command from '../components/Command';
import { MdCheck, MdDelete, MdEdit } from 'react-icons/md';
import { Button, Checkbox } from 'rsuite';
import { BiImport } from 'react-icons/bi';
import { IoAddSharp } from 'react-icons/io5';
import Placeholder from '../components/Placeholder';
import { MESSAGES, SCHEME_AS } from '../const/scheme';
import DialogCreate from '../components/Modal';
import { IconCopy } from '../components/IconClose';
import sortBy from 'lodash/sortBy';
import { PermissionsCtx } from '../ctx/permissions';

const List = ({
  items,
  onDelete,
  onDeleteMany,
  onRename,
  onSelect,
  onImport,
  onCreate,
  onMakeCopy,
  schema,
}) => {
  const ref = useRef();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({});
  const count = Object.keys(selected).length;
  const {
    actions: { extractSchemePermissions, validatePermissions },
  } = useContext(PermissionsCtx);

  const permissions = useMemo(
    () => [
      ...new Set(
        items
          .map((item) => {
            return extractSchemePermissions(item);
          })
          .flat()
      ),
    ],
    [extractSchemePermissions, items]
  );

  useEffect(() => {
    permissions.forEach(permission => {
      validatePermissions(permission);
    })
  }, [permissions, validatePermissions]);

  const selectAll = () => {
    setSelected((prev) => {
      if (items.length === count) {
        return {};
      }

      return items.reduce((all, item) => {
        all[item.$$uuid.toString()] = true;
        return all;
      }, {});
    });
  };

  const deleteSelected = () => {
    const map = new Map(items.map((item) => [item.$$uuid.toString(), item]));

    onDeleteMany(
      Object.keys(selected)
        .map((uuid) => map.get(uuid))
        .filter(Boolean)
    ).finally(() => {
      setSelected({});
    });
  };

  return (
    <>
      <div
        className={
          'min-h-[30px] fixed top-[35px] py-0.5 bg-white dark:bg-[#383838] z-40 flex items-center w-full shadow-[0_0_6px_-1px_rgba(0,0,0,0.3)]'
        }
      >
        {!!items.length && (
          <button
            onClick={selectAll}
            type={'button'}
            className="badge-blue badge !ml-4 !inline-flex !border-transparent"
          >
            <MdCheck className={'mr-1'} />
            {items.length === count ? 'Unselect' : 'Select'} All
          </button>
        )}
        {!!count && (
          <button
            type={'button'}
            onClick={deleteSelected}
            className="badge-pink badge !ml-auto !inline-flex !mr-4"
          >
            <MdDelete className={'mr-1'} />
            Delete ({count})
          </button>
        )}
      </div>
      <div className={'m-3'}>
        <input
          ref={ref}
          type={'file'}
          className={'hidden'}
          accept={'application/json'}
          onChange={onImport}
        />
        <h1 className={'text-lg h2'}>
          {!!items.length && 'Select one of scheme to view or edit'}
        </h1>
        {!items.length && <Placeholder>No any schemes yet</Placeholder>}
        {sortBy(items, [(o) => o.$name.toLowerCase()]).map((item) => {
          const isChecked = !!selected[item.$$uuid];

          return (
            <Command
              key={item.$$uuid}
              className={`mb-3 flex !pr-1 border ${
                isChecked
                  ? '!bg-surface-primary !border-primary dark:!border-surface-border-primary'
                  : ''
              }`}
            >
              <Checkbox
                checked={isChecked}
                className={'!my-0 !py-0'}
                onClick={() => {
                  setSelected((prev) => {
                    if (isChecked) {
                      delete prev[item.$$uuid];
                    } else {
                      prev[item.$$uuid] = true;
                    }

                    return { ...prev };
                  });
                }}
              />
              <button
                onClick={() => onSelect(item)}
                className={
                  'badge-blue !px-2 rounded-md !border-transparent !py-1 cursor-pointer hover:underline'
                }
              >
                {item.$name}
              </button>

              {item.$$version && (
                <span className={'text-xs text-gray-500 dark:text-gray-400 ml-2'}>
                  v{item.$$version}
                </span>
              )}

              <div className={'ml-auto flex items-center'}>
                <button
                  type={'button'}
                  onClick={() => onRename(item)}
                  className="badge-blue badge ml-2 !inline-flex !border-transparent"
                >
                  <MdEdit className={'mr-1'} />
                  Rename
                </button>

                {!!onMakeCopy && (
                  <button
                    type={'button'}
                    onClick={() => onMakeCopy(item)}
                    className="badge-blue badge ml-2 !inline-flex !border-transparent"
                  >
                    <IconCopy className={'mr-1'} />
                    Make a Copy
                  </button>
                )}

                <button
                  type={'button'}
                  onClick={() => onDelete(item)}
                  className="badge-pink badge ml-2 !inline-flex"
                >
                  <MdDelete className={'mr-1'} />
                  Delete
                </button>
              </div>
            </Command>
          );
        })}

        <div className={'flex items-center'}>
          <Button
            type={'button'}
            onClick={() => setShowModal(true)}
            className={`!inline-flex items-center  px-0.5 text-default leading-default badge badge-blue`}
          >
            <IoAddSharp className={'inline w-3.5 h-3.5'} /> Create
          </Button>
          or
          <Button
            type={'button'}
            onClick={() => ref.current?.click()}
            className={`!inline-flex items-center px-0.5 text-default leading-default badge badge-blue`}
          >
            <BiImport className={'inline w-3.5 h-3.5 mr-0.5'} /> Import
          </Button>
        </div>

        <DialogCreate
          title={MESSAGES.CREATE[schema]}
          open={showModal}
          short={schema !== SCHEME_AS.COMMAND}
          onClose={() => setShowModal(false)}
          onApply={onCreate}
        />
      </div>
    </>
  );
};

export default List;
