
const utils = {
  "String.prototype.includes": {
    run: (entity, ...params) => entity.includes(...params),
    arguments: {min: 1, max: 1}
  },
}

export default utils
