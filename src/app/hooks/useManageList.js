import React, {useCallback, useContext, useEffect, useState} from "react";
import Database from "../../chrome/services/Database";
import {MESSAGES, SCHEME_AS, UI_TABS} from "../const/scheme";
import {readFileAsJSON, saveTemplateAsFile} from "../funcs/files";
import {useActionFeedback} from "./useActionFeedback";
import {NotificationsCtx} from "../ctx/notifications";
import {infoStyles, warningStyles} from "../components/NotificationMessage";
import ScenarioFacade from "../../chrome/services/ScenarioFacade";
import {isActualVersion, latestVersion, migrate} from "../migrations";
import {nanoid} from "nanoid";
import {browser} from "../../chrome/const/extension";

const TABLES = {
  [SCHEME_AS.COMMAND]: Database.tables.scenarios,
  [SCHEME_AS.USER_SCRIPT]: Database.tables.userScripts,
  [SCHEME_AS.NET]: Database.tables.net,
  [SCHEME_AS.ALARMS]: Database.tables.alarms,
}
export const useManageScript = () => {
  const {message, toast} = useActionFeedback();

  const onExport = (model) => {
    saveTemplateAsFile(`${model.$name}.scenario.json`, model);
  }

  const onSave = (methods) => {
    toast("Saving...");
    return new ScenarioFacade(methods.getValues())
      .save()
      .then((m) => {
        methods.reset({}, {keepValues: true});
        return m;
      })
  };

  return {
    message,
    toast,
    onSave,
    onExport
  }
}

export const useManageList = (schema, {onSelect, getInitial, focused}) => {
  const table = TABLES[schema];
  const [items, setItems] = useState([]);
  const {actions} = useContext(NotificationsCtx)

  const getAll = useCallback(() => {
    return new Database(table)
      .getAll()
      .then(items => {
        setItems(items);
        return items;
      });
  }, [table]);

  const getOne = useCallback((uuid) => {
    return new Database(table)
      .get(uuid)
  }, [table]);

  const onDelete = (item) => {
    if (window.confirm(MESSAGES.DELETE[schema])) {
      return new ScenarioFacade(item)
        .delete()
        .finally(getAll)
    }

    return Promise.reject("Canceled");
  };

  const onDeleteMany = (items) => {
    if (window.confirm(MESSAGES.DELETE[schema])) {
      return Promise
        .all(items.map(item => new ScenarioFacade(item).delete()))
        .finally(getAll)
    }

    return Promise.reject("Canceled");
  };

  const onRename = (item) => {
    const newName = window.prompt(MESSAGES.RENAME[schema], item.$name);
    const db = new Database(table);

    if (!newName) return;

    item.$name = newName;

    return db.set(item.$$uuid, item)
      .finally(getAll)
  };


  const onMakeCopy = (original) => {
    const item = structuredClone(original);
    const db = new Database(table);

    item.$name = `Copy of ${item.$name}`;
    item.$$uuid = nanoid();
    item.$$updatedAt = Date.now();

    return db.set(item.$$uuid, item)
      .finally(getAll)
  };

  const onCreate = ({name, mode}) => {
    if (!name.trim()) return;

    const model = getInitial({name, schema, mode});

    new Database(table).set(model.$$uuid, model);

    onSelect(model);
  };

  const onImport = (e) => {
    const file = e.target.files[0];

    e.target.value = '';

    const dateFormat = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }

    return readFileAsJSON(file)
      .then((model) => {
        return new Database(TABLES[model.$$schema ?? SCHEME_AS.COMMAND])
          .get(model.$$uuid)
          .then(prevVersion => {

            if (!prevVersion) return model;

            return new Promise((resolve, reject) => {
              const close = actions.append({
                children: (
                  <div>
                    A conflict was detected.
                    <br/>
                    <br/>
                    You already have "{prevVersion.$name}", last updated
                    on "{new Date(prevVersion.$$updatedAt).toLocaleDateString('en-US', dateFormat)}",
                    which will be overwritten by the imported file "{file.name}", last updated
                    on "{new Date(model.$$updatedAt).toLocaleDateString('en-US', dateFormat)}".
                    <br/>
                    <br/>

                    Are you sure you want to proceed?
                    <br/>
                    <br/>

                    <button
                      className="badge-pink badge"
                      onClick={() => {
                        resolve(model);
                        close();
                      }}>
                      Replace File
                    </button>

                    <button
                      className="badge-grey badge"
                      onClick={() => {
                        reject(new Error("IMPORT_CANCELED"));
                        close();
                      }}>
                      Cancel Import
                    </button>
                  </div>
                ),
                allowClear: false,
                pallet: warningStyles
              })
            })
          })
      })
      .then(model => {
        const selectTabNotification = () => {
          if (model.$$schema !== schema) {
            actions.append({
              children: `You have imported "${file.name}", which is not related to the current tab. Please switch to the "${UI_TABS[model.$$schema]}" tab to see the scheme.`,
              allowClear: true,
              pallet: infoStyles
            })
          }
        }

        if (isActualVersion(model)) {
          return new ScenarioFacade(model).save().then(() => selectTabNotification())
        }

        return migrate([model]).then(() => {
          actions.append({
            children: `We've migrated "${file.name}" to version scheme ${latestVersion}`,
            //children: `We've migrated "${file.name}" to version scheme 2.0.0. In this new version, userScript has been moved to a separate schema, which we now handle automatically.`,
            allowClear: true,
            pallet: infoStyles
          });
          selectTabNotification();
        })
      })
      .finally(getAll)
  }

  useEffect(() => {
    if (focused) getAll();
  }, [getAll, focused]);

  useEffect(() => {
    const listener = (message) => {
      if (message.type !== 'SCRIPT_CHANGED') return;
      if (message.schema !== schema) return;

      getAll();

      const verbs = {install: 'installed', uninstall: 'uninstalled', update: 'updated'};
      const verb = verbs[message.action] || message.action;
      actions.append({
        children: `"${message.name}" has been ${verb} from the site.`,
        allowClear: true,
        pallet: infoStyles
      });
    };

    browser.runtime.onMessage.addListener(listener);
    return () => browser.runtime.onMessage.removeListener(listener);
  }, [schema, getAll, actions]);

  return {
    items,
    getOne,
    onCreate,
    onDelete,
    onDeleteMany,
    onRename,
    onImport,
    onMakeCopy
  }
}
