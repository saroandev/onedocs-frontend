/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthCheck } from "@/features/auth/hooks/use-auth-check";
import { showNotification } from "@/shared/lib/notification";
import { Loading } from "@/shared/ui";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const StartUp = () => {
  const { isLoading, isError, error } = useAuthCheck();

  useEffect(() => {
    if (isError) {
      showNotification("error", (error as any)?.response?.data?.detail || "Bir hata oluştu");
    }
  }, [isError, error]);

  if (isLoading) {
    return <Loading />;
  }

  return <Outlet />;
};
