import React from "react";
import IconCommand, { ICON_COLOR } from "../../components/IconCommand";
import { getInitialScheme, useSelectFrom } from "../../hooks/useSelectFrom";
import LinkToDoc from "../../components/LinkToDoc";
import { COMMANDS } from "../../const/commands";
import { MdClose } from "react-icons/md";

const scheme = {
  type: COMMANDS.CLOSE_TAB,
  tabId: getInitialScheme(),  // variableName for the tab ID (optional)
};

const Control = ({ name }) => {
  const { jsx: tabId } = useSelectFrom({
    group: `${name}tabId`,  // Tab ID selection (optional)
  });

  return (
    <>
      Close tab with ID {tabId} {/* Optionally allow the user to specify a tab ID */}
      <LinkToDoc href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/remove">
        Tab API Documentation
      </LinkToDoc>
    </>
  );
};

export const CloseTabCommand = {
  label: "Close Browser Tab",
  icon: <IconCommand Svg={MdClose} className={ICON_COLOR.RED} />,
  Control,
  scheme,
  group: "Browser API",
};
