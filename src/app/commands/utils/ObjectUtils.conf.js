const utils = {
  "Object.keys": {
    run: (...params) => Object.keys(...params),
    arguments: {min: 1, max: 1}
  },
  "Object.values": {
    run: (...params) => Object.values(...params),
    arguments: {min: 1, max: 1}
  },
  "Object.entries": {
    run: (...params) => Object.entries(...params),
    arguments: {min: 1, max: 1}
  },
  "Object.hasOwn": {
    run: (...params) => Object.hasOwn(...params),
    arguments: {min: 2, max: 2}
  },
  "Object.assign": {
    run: (...params) => Object.assign(...params),
    arguments: {min: 1, max: Infinity}
  },
  // 2
  "Object.prototype.hasOwnProperty": {
    run: (obj, ...params) => obj.hasOwnProperty(...params),
    arguments: {min: 1, max: 1}
  },
}


export default utils

