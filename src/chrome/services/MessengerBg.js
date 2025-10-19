import {browser} from "../const/extension";
import {IS_DEV} from "../const/support";
import ScenarioFacade from "./ScenarioFacade";

/**
 * Default action handlers for the extension
 */
const DEFAULT_ACTIONS = {
  /**
   * Ping handler - returns pong for connectivity testing
   */
  PING: () => Promise.resolve("Pong"),
  
  /**
   * Status handler - returns extension version
   */
  STATUS: () => Promise.resolve(browser.runtime.getManifest().version),
  
  /**
   * Install script handler - installs a script using ScenarioFacade
   * @param {Object} params - Parameters containing script data
   */
  INSTALL_SCRIPT: async (params) => {
    if (!params.script) {
      throw new Error('Script parameter is required');
    }
    
    const scriptData = JSON.parse(params.script);
    await new ScenarioFacade(scriptData).save();
    return "Script installed successfully";
  },

  /**
   * Get script handler - gets a script using ScenarioFacade
   * @param {Object} params - Parameters containing script data
   */
  GET_SCRIPT: async (params) => {
    if (!params.script) {
      throw new Error('Script parameter is required');
    }

    const scriptData = JSON.parse(params.script);
    return new ScenarioFacade(scriptData).db.get(scriptData.$$uuid);
  },
  
  /**
   * Uninstall script handler - uninstalls a script using ScenarioFacade
   * @param {Object} params - Parameters containing script data
   */
  UNINSTALL_SCRIPT: async (params) => {
    if (!params.script) {
      throw new Error('Script parameter is required');
    }
    
    const scriptData = JSON.parse(params.script);
    await new ScenarioFacade(scriptData).delete();
    return "Script uninstalled successfully";
  }
};

// Current actions registry using Map for efficient lookup
let actions = new Map(Object.entries(DEFAULT_ACTIONS));

/**
 * Message handler for runtime messages
 * @param {Object} message - Message object
 * @param {Object} sender - Sender information
 * @param {Function} sendResponse - Response callback
 * @returns {boolean} Whether to keep the message channel open
 */
const handleRuntimeMessage = (message, sender, sendResponse) => {
  const { type, key, params } = message;
  const tab = sender.tab;

  // Skip internal extension messages
  if (type === 'FROM_CONTENT' || type === 'FROM_SIDEPANEL') {
    return false;
  }

  if (IS_DEV) {
    console.log("Processing action:", { key, params });
  }

  const action = actions.get(key);

  if (!action) {
    console.error("Action not found:", key);
    sendResponse({ key, err: { message: `Action '${key}' not found` } });
    return false;
  }

  // Execute action with error handling
  Promise.resolve()
    .then(() => action(params, { tabId: tab?.id }))
    .then(data => {
      sendResponse({ key, data });
    })
    .catch(err => {
      console.error(`Error executing action '${key}':`, err);
      sendResponse({ key, err: { message: err.message, stack: err.stack } });
    });

  return true; // Keep message channel open for async response
};

/**
 * Messenger class for managing action handlers
 */
class Messenger {
  /**
   * Register additional action handlers
   * @param {Object} newActions - Object containing new action handlers
   */
  static registerHandlers(newActions) {
    // Convert object to Map entries and merge with existing actions
    const newActionEntries = Object.entries(newActions);
    newActionEntries.forEach(([key, handler]) => {
      actions.set(key, handler);
    });
    
    if (IS_DEV) {
      console.log("Registered new handlers:", Object.keys(newActions));
    }
  }

  /**
   * Get all registered action keys
   * @returns {string[]} Array of action keys
   */
  static getRegisteredActions() {
    return Array.from(actions.keys());
  }

  /**
   * Check if an action is registered
   * @param {string} key - Action key to check
   * @returns {boolean} Whether the action is registered
   */
  static hasAction(key) {
    return actions.has(key);
  }
}

// Initialize message listener
browser.runtime.onMessage.addListener(handleRuntimeMessage);

export default Messenger;
