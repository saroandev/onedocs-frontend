/* eslint-disable react-hooks/static-components */
import { getLazyComponent } from "@/shared/lib/module-loader";
import { Loading } from "@/shared/ui";
import { Suspense } from "react";

export const PageLoader = (props: PageLoaderProps) => {
  const { modulePath, moduleName } = props;
  const CachedComponent = getLazyComponent(modulePath, moduleName);

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
