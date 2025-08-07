import {BROWSER} from "../../chrome/const/support";

const eruda  = BROWSER === 'chrome' && require("eruda");

window.logger = null;

export const initLogger = async () => {
  if(!eruda) {
    return console;
  }

  if (!window.logger) {
    const el = document.createElement('div');

    document.body.appendChild(el);

    eruda.init({
      container: el,
    });

    window.logger = eruda;
  }

  eruda.show();

  return eruda.get('console');
}

export const hideLogger = () => {
  if(window.logger)window.logger.hide();
}

const run = async ({value}, {getProperty}) => {
  const data = getProperty(value);
  const con = await initLogger();
  con.log("LOG :", value, data);
}

export default run
