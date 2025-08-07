
const utils = {
  "Math.min": {
    run: (...params) => Math.min(...params),
    arguments: {min: 2, max: Infinity}
  },
  "Math.max": {
    run: (...params) => Math.max(...params),
    arguments: {min: 2, max: Infinity}
  }
}

export default utils;
