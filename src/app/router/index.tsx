import { Route, Routes } from "react-router-dom";
import { RootLayout } from "@/app/layouts/root-layout";
import { AuthGuard } from "./guard/public-guard";
import { PublicRoutes } from "./public-routes";
import { AuthRoutes } from "./auth-routes";
import { usePublicStore } from "@/features/public/store/public.store";

export const AppRouter = () => {
  const token = usePublicStore((state) => state.token);

  // const isAuthenticated = usePublicStore((state) => state.isAuthenticated);

  // if (!isAuthenticated) {
  //   return <Navigate to={ROUTES.DASHBOARD} replace />;
  // }

  if (!token) {
    return (
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/*" element={<PublicRoutes />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<AuthGuard />}>
          <Route path="/*" element={<AuthRoutes />} />
        </Route>
      </Route>
    </Routes>
  );
};
