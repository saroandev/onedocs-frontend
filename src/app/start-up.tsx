import { useAuthCheck } from "@/features/auth/hooks/use-auth-check";
import { Loading } from "@/shared/ui";
import { Outlet } from "react-router-dom";

export const StartUp = () => {
  const { isLoading } = useAuthCheck();

  if (isLoading) {
    return <Loading />;
  }

  return <Outlet />;
};
