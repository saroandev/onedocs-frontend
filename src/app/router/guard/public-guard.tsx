import { Navigate, Outlet } from "react-router-dom";
import { PublicLayout } from "@/app/layouts";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { ROUTES } from "../config/routes.config";

export const PublicGuard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);

  return !token || !isAuthenticated ? (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  ) : (
    <Navigate to={ROUTES.DASHBOARD} replace />
  );
};
