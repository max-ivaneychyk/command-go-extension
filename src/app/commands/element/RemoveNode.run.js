
const run = async ({from, saveTo}, {getProperty}) => {
  getProperty(from)?.remove()
}

export default run;
