window.addEventListener("message", async ({data, source}) => {
  if (!data.toString().startsWith('/*#exec#*/')) return;

  try {
    const result = await eval(data);
    source.postMessage("/*#return#*/" + JSON.stringify({data: result}), "*")
  } catch (err) {
    source.postMessage("/*#return#*/" + JSON.stringify({err: {message: err.message}}), "*")
  }
});

