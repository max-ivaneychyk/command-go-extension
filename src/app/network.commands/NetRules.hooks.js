import { getSourceValue } from '../funcs/variables';
import { browser } from '../../chrome/const/extension';
import { excludeAllSkipped, isSkipped } from '../funcs/optional';

const hooks = {
  onInstall: async (command) => {
    const { priority, condition, action, id } = command;

    const mapHeader = ({ header, operation, value }) => {
      const op = getSourceValue(operation);
      const val = op === 'set' ? value : undefined;

      return {
        header: getSourceValue(header),
        operation: op,
        value: val,
      };
    };

    const requestHeaders = excludeAllSkipped(action.requestHeaders ?? []);
    const responseHeaders = excludeAllSkipped(action.responseHeaders ?? []);

    if (!responseHeaders.length && !requestHeaders.length) return;
    if (isSkipped(command)) return;

    const rule = {
      id: Number(id),
      priority,
      condition,
      action: {
        type: action.type,
        requestHeaders: requestHeaders.length
          ? requestHeaders.map(mapHeader)
          : undefined,
        responseHeaders: responseHeaders.length
          ? responseHeaders.map(mapHeader)
          : undefined,
      },
    };

    await browser.declarativeNetRequest.updateDynamicRules({
      addRules: [rule],
    });
  },
  onUninstall: async (command) => {
    await browser.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [Number(command.id)],
    });
  },
};

export default hooks;
