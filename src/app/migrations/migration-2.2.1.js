
// Migrate functions naming
export const migrateToV2_2_1 = async (scene) => {
    // Patch to next version
    scene.$$version = "2.2.1"
    scene.$$updatedAt = Date.now();

    const json = JSON.stringify(scene).replaceAll("\"f:", "\"fx:")

    return [JSON.parse(json)];
}
