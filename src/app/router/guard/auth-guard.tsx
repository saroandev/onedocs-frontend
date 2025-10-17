import { Navigate } from "react-router-dom";
import { AuthLayout } from "@/app/layouts";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { StartUp } from "@/app/start-up";
import { ROUTES } from "../config/routes.config";

export const AuthGuard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);

  return token && isAuthenticated ? (
    <AuthLayout>
      <StartUp />
    </AuthLayout>
  ) : (
    <Navigate to={ROUTES.SIGN_IN} replace />
  );
};
