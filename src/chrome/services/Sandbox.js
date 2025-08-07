import {browser} from "../const/extension";


export class Sandbox {
  static fetchScriptContent (url) {
    return fetch(url, {
      method: "GET",
      mode: "cors"
    })
      .then(data => data.text())
  }
  static execute (inlineScript) {
    const hoge = async (code) => {
      let iframe = document.getElementById("hoge");

      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.src = browser.runtime.getURL("sandbox.html");
        iframe.id = "hoge";
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.opacity = "0";
        iframe.sandbox = 'allow-scripts allow-same-origin'

        document.body.appendChild(iframe);

        await new Promise(r => setTimeout(r, 1000));
      }

     return new Promise((resolve, reject) => {
        const onMessage = ({data}) => {
          if (!data.toString().startsWith("/*#return#*/")) return;

          window.removeEventListener("message", onMessage);

          const {err, data: d} = JSON.parse(data.replace("/*#return#*/", ''))

          if(err)return reject(err);

          resolve(d)
        };

        window.addEventListener("message", onMessage);

        iframe.contentWindow.postMessage(`/*#exec#*/${code}`, "*");
     })

    }

    return Promise
      .resolve(inlineScript)
      .then(hoge)
  }
}
