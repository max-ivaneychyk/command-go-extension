import {DEFAULT_SCOPE} from "../scope";

export class VirtualScope {
  constructor(schema) {
    this.schema = schema;
  }

  getScope (scope) {
    return this.schema[scope] || null
  }
  get (scope, variable) {
    let localScope = this.getScope(scope) || this.schema[DEFAULT_SCOPE];

    while (true) {
      const {$$ref, ...params} = localScope;

      if (Object.hasOwn(params, variable)){
        return params[variable]
      }

      if (!$$ref)return; // it is global scope

      localScope = this.schema[$$ref];
    }
  }

  getAllParents (scope) {
    let localScope = this.getScope(scope) || this.schema[DEFAULT_SCOPE];
    const parents = [];

    while (true) {
      const {$$ref, ...params} = localScope;

      if (Object.hasOwn(params)){
         parents.push(params);
      }

      if (!$$ref)break; // it is global scope

      localScope = this.schema[$$ref];
    }

    return parents
  }

  set (scope, variable, value) {
    let localScope = this.getScope(scope) || this.schema[DEFAULT_SCOPE];

    while (true) {
      const {$$ref} = localScope;

      if (Object.hasOwn(localScope, variable)){
        localScope[variable] = value
        return;
      }

      if (!$$ref){
        localScope[variable] = value
        return;// it is global scope
      }

      localScope = this.schema[$$ref];
    }
  }
}
