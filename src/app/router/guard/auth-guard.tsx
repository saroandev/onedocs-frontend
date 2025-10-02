import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useAuthCheck } from "@/features/auth/hooks/use-auth-check";
import { ROUTES } from "../routes.config";

export const AuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, token } = useAuthStore();
  const { isLoading, isError } = useAuthCheck();

  useEffect(() => {
    if (!token && !isLoading) {
      navigate(ROUTES.SIGN_IN, {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [token, isLoading]);

  useEffect(() => {
    if (isError) {
      useAuthStore.getState().logout();
      navigate(ROUTES.SIGN_IN, { replace: true });
    }
  }, [isError, navigate]);

  if (!isLoading) {
    return <Loading />; // TODO
  }

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
};
