export function walkNestedJson(obj, callback, path = []) {
  if (Array.isArray(obj)) {
    // if the current object is an array, iterate through its elements
    for (let i = 0; i < obj.length; i++) {
      walkNestedJson(obj[i], callback, [...path, i]); // include array index in the path
    }
  } else if (typeof obj === 'object' && obj !== null) {
    // if the current object is an object, iterate through its properties
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        walkNestedJson(obj[key], callback, [...path, key]); // include object key in the path
      }
    }
  }

  callback(obj, path);
}

