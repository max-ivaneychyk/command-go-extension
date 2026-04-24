import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import Command from '../components/Command';
import { MdCheck, MdDelete, MdEdit } from 'react-icons/md';
import { Button, Checkbox } from 'rsuite';
import { BiImport } from 'react-icons/bi';
import { IoAddSharp, IoEarthOutline, IoStorefront } from 'react-icons/io5';
import { FaGithub } from 'react-icons/fa';
import Placeholder from '../components/Placeholder';
import { MESSAGES, SCHEME_AS, UI_TABS } from '../const/scheme';
import DialogCreate from '../components/Modal';
import { IconCopy } from '../components/IconClose';
import sortBy from 'lodash/sortBy';
import { PermissionsCtx } from '../ctx/permissions';

const QUICK_LINKS = [
  {
    href: 'https://commandgo.org/',
    label: 'Website',
    icon: IoEarthOutline,
  },
  {
    href: 'https://commandgo.org/marketplace',
    label: 'Marketplace',
    icon: IoStorefront,
  },
  {
    href: 'https://github.com/max-ivaneychyk/command-go-extension',
    label: 'GitHub',
    icon: FaGithub,
  },
];

const QuickLinks = () => (
  <div className={'mt-6 pt-4 border-t border-gray-200 dark:border-gray-700'}>
    <p className={'text-xs text-gray-600 dark:text-gray-400 mb-2'}>Quick Links:</p>
    <div className={'flex flex-wrap gap-2'}>
      {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={'badge badge-blue !inline-flex items-center text-xs hover:underline text-blue-700 dark:!text-white'}
        >
          <Icon className={'mr-1 w-3.5 h-3.5'} />
          {label}
        </a>
      ))}
    </div>
  </div>
);

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
        <h1 className={'text-sm h2'}>
          {!!items.length && `Select ${UI_TABS[schema]?.toLowerCase() || 'item'} to view or edit`}
        </h1>
        {!items.length && (
          <div className={'dark:bg-[#242424] dark:border dark:border-[#373737] bg-blue-50 rounded my-2 p-4'}>
            <p className={'text-gray-700 dark:text-white font-medium mb-2 text-center'}>Get started in 3 steps</p>
            <ol className={'text-gray-500 dark:text-gray-400 text-sm list-none space-y-2 mb-0 pl-0'}>
              <li className={'flex items-start gap-2'}>
                <span className={'badge badge-blue !mx-0 font-bold flex-shrink-0'}>1</span>
                <span>Click <strong>Create</strong> below and name your scenario</span>
              </li>
              <li className={'flex items-start gap-2'}>
                <span className={'badge badge-blue !mx-0 font-bold flex-shrink-0'}>2</span>
                <span>Add commands — e.g. <strong>Find Element</strong>, <strong>Fetch</strong>, or <strong>Set Variable</strong></span>
              </li>
              <li className={'flex items-start gap-2'}>
                <span className={'badge badge-blue !mx-0 font-bold flex-shrink-0'}>3</span>
                <span>Add a <strong>trigger</strong> to run automatically, or hit <strong>Run</strong> to test it</span>
              </li>
            </ol>
            <p className={'text-gray-400 dark:text-gray-500 text-xs mt-3 text-center'}>
              You can also <strong>Import</strong> a scenario from a file or browse the <a href="https://commandgo.org/marketplace" target="_blank" rel="noopener noreferrer" className={'text-blue-500 hover:underline'}>Marketplace</a>
            </p>
          </div>
        )}
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

        <QuickLinks />

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
