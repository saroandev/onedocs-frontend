import type { ReactNode } from "react";
import { usePublicStore } from "@/features/public/store/public.store";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../routes.config";

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
  const user = usePublicStore((state) => state.user);

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
