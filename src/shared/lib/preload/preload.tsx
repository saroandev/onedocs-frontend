export const preloadPageModule = async (modulePath: string) => {
  const modules = import.meta.glob("/src/pages/**/**/*.page.{tsx,ts}");
  const importer = modules[`/src/pages/${modulePath}`];

  if (importer) {
    await importer();
  }
};
