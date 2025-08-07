import {browser} from "../../chrome/const/extension";
import {db, dbUserScripts} from "./database";
import {USER_SCRIPT_FUNCTIONS} from "../../app/commands/code/save";
import {migrate} from "../../app/migrations";

browser.runtime.setUninstallURL('https://forms.gle/uNF1zzf6KshVzgLg6', () => {
  if (chrome.runtime.lastError) {
    console.error(`Error setting uninstall URL: ${chrome.runtime.lastError}`);
  }
});

browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === browser.runtime.OnInstalledReason.UPDATE) {
    // Your code to restore user scripts goes here
    console.log('Extension updated, restoring user scripts...');

    return db.getAll()
      .then(scenarios => migrate(scenarios))
      .finally(() => {
        // Restore User Scripts
        dbUserScripts.getAll().then(scenes => {
          const scripts = scenes.flatMap((scene) => scene.commands ?? []);

          for (let script of scripts) {
            try {
              USER_SCRIPT_FUNCTIONS[script.type]?.(script);
              console.info("Register Script ID:", script.$id);
            } catch (e) {
              console.warn(e);
            }
          }
        });
      })
  }
});

