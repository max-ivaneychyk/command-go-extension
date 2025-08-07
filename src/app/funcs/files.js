export const saveTemplateAsFile = (filename, dataObjToWrite) => {
  const blob = new Blob([JSON.stringify(dataObjToWrite)], {type: "text/json"});
  const link = document.createElement("a");

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

  const evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  link.dispatchEvent(evt);
  link.remove()
};

export const readFileAsJSON = blob => {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.addEventListener('load', () => {
      resolve(JSON.parse(r.result))
    })
    r.addEventListener('error', reject)
    r.readAsText(blob)
  })
}
