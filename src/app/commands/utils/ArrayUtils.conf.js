
const arrayUtilsConf = {
  "Array.prototype.includes": {
    run: (entity, ...params) => entity.includes(...params),
    arguments: {min: 1, max: 1}
  },
  "Array.prototype.indexOf": {
    run: (entity, ...params) => entity.indexOf(...params),
    arguments: {min: 1, max: 1}
  },
  "Array.prototype.join": {
    run: (entity, ...params) => entity.join(...params),
    arguments: {min: 0, max: 1}
  },
  "Array.prototype.push": {
    run: (entity, ...params) => entity.push(...params),
    arguments: {min: 1, max: Infinity}
  },
  "Array.prototype.at": {
    run: (entity, ...params) => entity.at(...params),
    arguments: {min: 1, max: 1}
  },
}

export default arrayUtilsConf;
