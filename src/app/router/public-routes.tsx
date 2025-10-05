import { Navigate, Route, Routes } from "react-router-dom";
import { PublicLayout } from "../layouts";
import { Suspense } from "react";
import { routes } from "./routes";

export const PublicRoutes = () => {
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
