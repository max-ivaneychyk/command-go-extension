import { TRIGGERS } from '../../app/const/triggers';
import { listen } from './listenAnyAPIs';


listen(chrome.tabs.onCreated, TRIGGERS.TAB_CREATED);
listen(chrome.tabs.onUpdated, TRIGGERS.TAB_UPDATED);
listen(chrome.tabs.onRemoved, TRIGGERS.TAB_REMOVED);
listen(chrome.tabs.onMoved, TRIGGERS.TAB_MOVED); // todo - need test

if (chrome?.notifications?.onClicked) {
  listen(chrome.notifications.onClicked, TRIGGERS.NOTIFICATION_CLICKED); // todo - need test
  listen(chrome.notifications.onClosed, TRIGGERS.NOTIFICATION_CLOSED);
}
