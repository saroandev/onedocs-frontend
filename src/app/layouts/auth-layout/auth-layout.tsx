import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { ROUTES } from "../../router/routes.config";
import styles from "./auth-layout.module.scss";

export const AuthLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.children}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
