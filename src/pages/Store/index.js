

/**
 * CommandGo Store Page - Handles communication between marketplace and extension
 * Provides API for script installation, uninstallation, and status checking
 */

// Message types for communication
const MESSAGE_TYPES = {
  STATUS: '>>STATUS',
  INSTALL_SCRIPT: '>>INSTALL_SCRIPT',
  UNINSTALL_SCRIPT: '>>UNINSTALL_SCRIPT',
  GET_SCRIPT: '>>GET_SCRIPT'
};

// Response types
const RESPONSE_TYPES = {
  STATUS: '<<STATUS',
  INSTALL_SCRIPT: '<<INSTALL_SCRIPT',
  UNINSTALL_SCRIPT: '<<UNINSTALL_SCRIPT',
  GET_SCRIPT: '<<GET_SCRIPT'
};

/**
 * Sends a message to the extension background script
 * @param {string} key - Message key/type
 * @param {Object} params - Message parameters
 * @returns {Promise} Promise that resolves with response data
 */
const sendToExtension = (key, params) => {
  return chrome.runtime.sendMessage({ key, params });
};

/**
 * Sends a response back to the source window
 * @param {MessageEvent} event - Original message event
 * @param {string} responseType - Type of response
 * @param {Object} data - Response data
 * @param {string} status - Status ('ok' or 'error')
 */
const sendResponse = (event, responseType, data, status = 'ok') => {
  const response = {
    type: responseType,
    status,
    data
  };
  
  event.source.postMessage(response, { 
    targetOrigin: window.location.origin 
  });
};

/**
 * Handles status requests
 * @param {MessageEvent} event - Message event
 */
const handleStatusRequest = async (event) => {
  try {
    const data = await sendToExtension('STATUS', event.data);
    sendResponse(event, RESPONSE_TYPES.STATUS, data.data, 'ok');
  } catch (err) {
    sendResponse(event, RESPONSE_TYPES.STATUS, err.err, 'error');
  }
};

/**
 * Handles script installation requests
 * @param {MessageEvent} event - Message event
 */
const handleInstallScriptRequest = async (event) => {
  try {
    const data = await sendToExtension('INSTALL_SCRIPT', event.data);
    sendResponse(event, RESPONSE_TYPES.INSTALL_SCRIPT, data.data, 'ok');
  } catch (err) {
    sendResponse(event, RESPONSE_TYPES.INSTALL_SCRIPT, err.err, 'error');
  }
};

/**
 * Handles script uninstallation requests
 * @param {MessageEvent} event - Message event
 */
const handleUninstallScriptRequest = async (event) => {
  try {
    const data = await sendToExtension('UNINSTALL_SCRIPT', event.data);
    sendResponse(event, RESPONSE_TYPES.UNINSTALL_SCRIPT, data.data, 'ok');
  } catch (err) {
    sendResponse(event, RESPONSE_TYPES.UNINSTALL_SCRIPT, err.err, 'error');
  }
};

/**
 * Handles script get requests
 * @param {MessageEvent} event - Message event
 */
const handleGetScriptRequest = async (event) => {
  try {
    const data = await sendToExtension('GET_SCRIPT', event.data);
    sendResponse(event, RESPONSE_TYPES.GET_SCRIPT, data.data, 'ok');
  } catch (err) {
    sendResponse(event, RESPONSE_TYPES.GET_SCRIPT, err.err, 'error');
  }
};

// Message handler map for efficient routing (declared after functions)
const MESSAGE_HANDLERS = new Map([
  [MESSAGE_TYPES.STATUS, handleStatusRequest],
  [MESSAGE_TYPES.INSTALL_SCRIPT, handleInstallScriptRequest],
  [MESSAGE_TYPES.UNINSTALL_SCRIPT, handleUninstallScriptRequest],
  [MESSAGE_TYPES.GET_SCRIPT, handleGetScriptRequest]
]);

/**
 * Message handler router using Map for efficient lookup
 * @param {MessageEvent} event - Message event
 */
const handleMessage = (event) => {
  // Security check: only accept messages from same window
  if (event.source !== window) {
    return;
  }

  const { type } = event.data;
  const handler = MESSAGE_HANDLERS.get(type);

  if (handler) {
    handler(event);
  } else {
    console.warn('Unknown message type:', type);
  }
};

// Initialize message listener
window.addEventListener('message', handleMessage);