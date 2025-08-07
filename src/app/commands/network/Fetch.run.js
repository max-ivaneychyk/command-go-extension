import Validator from "../../validators/Validator";
import {getSourceValue} from "../../funcs/variables";
import ExecuteInMain from "../../classes/ExecuteInMain";
import Fetch from "../../classes/API/Fetch";
import {excludeAllSkipped} from "../../funcs/optional";

const run = async ({method, parseAs, saveTo, main, url, body, headers, sourceOfHeaders}, {getProperty, setProperty}) => {
  const URL = getSourceValue(url, {getProperty});
  const bodyData = getSourceValue(body, {getProperty});

  let $headers = null;

  if (!sourceOfHeaders?.as) {
    $headers = {};

    excludeAllSkipped(headers)
      .forEach(({from, to}, i) => {
      const [a, b] = [
        getSourceValue(from, {getProperty}),
        getSourceValue(to, {getProperty})
      ];

      Validator.asString(a, `Header name [${i}]`);
      Validator.asString(b, `Header value [${i}]`);

      $headers[a] = b;
    });
  } else {
    $headers = getSourceValue(sourceOfHeaders, {getProperty});
  }

  Validator.asString(URL, "url");
  Validator.asNotEmpty(URL, "url");

  const response = await ExecuteInMain.callInMainWhen(
    main,
    Fetch,
    {body: bodyData, method, url: URL, headers: $headers, parseAs})

  if (saveTo) {
    setProperty(saveTo, response)
  }
  return response
}

export default run
