import type { ReactNode } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../config/routes.config";

interface PermissionGuardProps {
  children: ReactNode;
  permission: string | string[];
  fallback?: ReactNode;
}

export const PermissionGuard = ({
  children,
  permission,
  fallback = <Navigate to={ROUTES.DASHBOARD} replace />,
}: PermissionGuardProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <>{fallback}</>;
  }

  const permissions = Array.isArray(permission) ? permission : [permission]; //TODO
  const hasPermission = permissions.some((perm: string) => user.permissions?.[perm] === true);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
