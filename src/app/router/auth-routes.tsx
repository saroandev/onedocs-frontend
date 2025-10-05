import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "../layouts";
import { Suspense } from "react";
import { routes } from "./routes";
import { Page404 } from "@/pages/errors/404.page";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {routes.protected.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<>loaidng</>}>
                <Component />
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};
