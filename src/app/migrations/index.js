import {migrateToV2} from "./migration-2.0.0";
import {migrateToV2_2_0} from "./migration-2.2.0";
import ScenarioFacade from "../../chrome/services/ScenarioFacade";
import {migrateToV2_2_1} from "./migration-2.2.1";

export const minimalVersion = '1.0.0';
export const latestVersion = '2.2.1';

const migrations = {
  [minimalVersion]: migrateToV2,
  "2.0.0": migrateToV2_2_0,
  "2.2.0": migrateToV2_2_1,
}

const getVersion = scene => scene.$$version || minimalVersion;

export const isActualVersion = scene => getVersion(scene) === latestVersion;

export const migrate = async (scenarios, recursive = false) => {

  const allMigrations = scenarios.map(async scene => {
    let actualVersion = isActualVersion(scene);

    if (actualVersion) {
      return !recursive ? null : new ScenarioFacade(scene).save();
    }

    const version = getVersion(scene);
    const migration = migrations[version];

    return migrate(await migration(scene), true);
  })

  return Promise.allSettled(allMigrations);
}
