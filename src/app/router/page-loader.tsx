/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loading } from "@/shared/ui";
import { lazy, Suspense, type ComponentType } from "react";

const modules = import.meta.glob("/src/pages/**/**/*.page.{tsx,ts}");
const componentCache = new Map<string, ComponentType<any>>();

export const PageLoader = (props: PageLoaderProps) => {
  const { modulePath, moduleName } = props;
  const cacheKey = `${modulePath}:${moduleName}`;

  if (!componentCache.has(cacheKey)) {
    const LazyComponent = lazy(() =>
      modules[`/src/pages/${modulePath}`]().then((module: any) => ({
        default: module[moduleName],
      }))
    );
    componentCache.set(cacheKey, LazyComponent);
  }

  const CachedComponent = componentCache.get(cacheKey)!;

  return (
    <Suspense fallback={<Loading />}>
      <CachedComponent />
    </Suspense>
  );
};

interface PageLoaderProps {
  modulePath: string;
  moduleName: string;
}
