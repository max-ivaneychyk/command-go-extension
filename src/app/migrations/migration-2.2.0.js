import {SCHEME_AS} from "../const/scheme";
import {walkNestedJson} from "../funcs/walkNestedJson";
import {SOURCE_TYPES} from "../const/variables";

// Migrate .arguments to a new version
export const migrateToV2_2_0 = async (scene) => {
    // Patch to next version
    scene.$$version = "2.2.0"

    if (scene.$$schema !== SCHEME_AS.COMMAND) {
      return [scene];
    }

    scene.$$updatedAt = Date.now();

    walkNestedJson(scene.commands, (value) => {
      if (typeof value === 'object' && value?.arguments) {
        value.arguments = value.arguments.map((s) => {
          const {name, value} = s;
          // already migrated
          if(value)return s;
          // need to migrate
          return {value: name, as: SOURCE_TYPES.VARIABLE}
        })
      }
    })

    return [scene];
}
