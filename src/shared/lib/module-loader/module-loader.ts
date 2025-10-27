/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, type ComponentType } from "react";

const modules = import.meta.glob("/src/pages/**/**/*.page.{tsx,ts}");

const moduleCache = new Map<
  string,
  {
    promise: Promise<any>;
    component?: ComponentType<any>;
  }
>();

const getModuleLoader = (modulePath: string) => {
  const fullPath = `/src/pages/${modulePath}`;
  const moduleLoader = modules[fullPath];

  if (!moduleLoader) {
    console.warn(`Module not found: ${fullPath}`);
    return null;
  }

  return moduleLoader;
};

export const preloadPageModule = (modulePath: string): Promise<any> => {
  const cacheKey = modulePath;

  if (moduleCache.has(cacheKey)) {
    return moduleCache.get(cacheKey)!.promise;
  }

  const moduleLoader = getModuleLoader(modulePath);
  if (!moduleLoader) {
    return Promise.resolve(null);
  }

  const loadPromise = moduleLoader();
  moduleCache.set(cacheKey, { promise: loadPromise });

  return loadPromise;
};

export const getLazyComponent = (modulePath: string, moduleName: string): ComponentType<any> => {
  const cacheKey = modulePath;

  const cached = moduleCache.get(cacheKey);

  if (cached?.component) {
    return cached.component;
  }

  const LazyComponent = lazy(() => {
    if (cached?.promise) {
      return cached.promise.then((module: any) => ({
        default: module[moduleName],
      }));
    }

    const moduleLoader = getModuleLoader(modulePath);
    if (!moduleLoader) {
      throw new Error(`Module not found: ${modulePath}`);
    }

    const loadPromise = moduleLoader().then((module: any) => ({
      default: module[moduleName],
    }));

    moduleCache.set(cacheKey, {
      promise: loadPromise.then((m) => m),
      component: LazyComponent,
    });

    return loadPromise;
  });

  if (cached) {
    cached.component = LazyComponent;
  } else {
    moduleCache.set(cacheKey, {
      promise: Promise.resolve(null),
      component: LazyComponent,
    });
  }

  return LazyComponent;
};

export const clearModuleCache = (modulePath?: string) => {
  if (modulePath) {
    moduleCache.delete(modulePath);
  } else {
    moduleCache.clear();
  }
};
