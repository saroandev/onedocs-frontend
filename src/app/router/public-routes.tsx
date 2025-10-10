import { Navigate, Route, Routes } from "react-router-dom";
import { PublicLayout } from "../layouts";
import { Suspense } from "react";
import { routes } from "./routes";
import { usePublicStore } from "@/features/public/store/public.store";
import { useAppNavigation } from "@/shared/lib/navigation";
import { ROUTES } from "./routes.config";

export const PublicRoutes = () => {
  const isAuthenticated = usePublicStore((state) => state.isAuthenticated);
  const { goTo } = useAppNavigation();

  if (isAuthenticated) {
    goTo(ROUTES.DASHBOARD, { replace: true });
  }

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {routes.public.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<>loaing</>}>
                <Component />
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Route>
    </Routes>
  );
};
