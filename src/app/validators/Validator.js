


class Validator {
  static asNode (node, label) {
    if(!node?.appendChild)throw new Error(`${label} is not valid html node`);
    return null;
  }

  static asString (name, label) {
    if(typeof name !== 'string')throw new Error(`${label} is not a string`);
    return null;
  }

  static asNotEmpty (variable, label) {
    if( variable === 0)return null;
    if(!variable)throw new Error(`${label} is undefined or empty`);
    return null;
  }

  static isAny (variable, label) {
    if( variable === 0 || variable === "")return null;
    if(!variable)throw new Error(`${label} is undefined or empty`);
    return null;
  }

  static asNumber (variable, label) {
    if(Number(variable).toString() !== variable.toString())throw new Error(`${label} is not a number`);
    return null;
  }

  static asPositiveNumber (variable, label) {
    if(Number(variable) < 0)throw new Error(`${label} is not a positive number`);
    return null;
  }

  static asArray (list, from) {
    if (!list) {
      throw new Error("Variable is not defined " + from)
    }
    if (!Array.isArray(list)) {
      throw new Error("Invalid type of variable " + from)
    }
    return null;
  }

  static asObject (obj, from) {
     if(!obj?.hasOwnProperty)throw new Error("Variable is not an object " + from);
     return null;
  }
}

export default Validator
