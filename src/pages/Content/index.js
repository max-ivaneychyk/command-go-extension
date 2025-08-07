import {Scenario} from "../../app/classes/Scenario";
import "../../app/map.page.run";
import {VirtualScope} from "../../app/classes/VirtualScope";
import {browser} from "../../chrome/const/extension";
import {initLogger} from "../../app/commands/Log.run";
import {IS_DEV} from "../../chrome/const/support";


// http://info.cern.ch/hypertext/WWW/TheProject.html
if(IS_DEV)console.log("CONTENT SCRIPT", new Date().getSeconds())
// set marker

const onTrack = ({id, status, message} = {}) => {

  browser.runtime.sendMessage({
    type: "FROM_CONTENT",
    message: {
      id,
      status,
      message
    }
  })
}

if (!window.CONTENT_SCRIPT) {
  window.CONTENT_SCRIPT = true

  // Listen for messages from the side panel
  browser.runtime.onMessage.addListener(async (request) => {
    if (request.type === "FROM_SIDEPANEL") {

      const {scope, commands, debug} = request.message;
      const virtualScope = new VirtualScope(scope);

      window.CG_DEBUG = debug;

      if (debug) {
        await initLogger();
      }

      new Scenario(commands)
        .onTrack(onTrack)
        .execute(
          virtualScope
        );
    }
  });
}

// onload - execute if still not injected
;(window?.__scenarios?.complete || [])
  .concat(window?.__scenarios?.loading || [])
  .forEach(({commands, $$scopes, $$uuid}) => {
    const validId = $$uuid.toString().replace(/\W/gi, "");

    if (document.body.dataset[validId] === "LOADED") return;

    document.body.dataset[validId] = "LOADED";

    new Scenario(commands)
      .onTrack(onTrack)
      .execute(
        new VirtualScope($$scopes)
      );
  });



