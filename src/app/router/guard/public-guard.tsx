import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../routes.config";
import { usePublicStore } from "@/features/public/store/public.store";
import { useAuthCheck } from "@/features/public/hooks/use-auth-check";

export const AuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, token } = usePublicStore();
  const { isLoading, isError } = useAuthCheck();

  // console.log({ isAuthenticated });
  // console.log({ token });
  // console.log({ isLoading });
  // console.log({ isError });

  // useEffect(() => {
  //   if (!token && !isLoading) {
  //     navigate(ROUTES.SIGN_IN, {
  //       state: { from: location.pathname },
  //       replace: true,
  //     });
  //   }
  // }, [token, isLoading]);

  // useEffect(() => {
  //   if (isError) {
  //     usePublicStore.getState().logout();
  //     navigate(ROUTES.SIGN_IN, { replace: true });
  //   }
  // }, [isError, navigate]);

  // if (!isLoading) {
  //   // return <Loading />; //TODO
  //   return <>loading</>; //TODO
  // }

  // if (!isAuthenticated) {
  //   return null;
  // }

  return <Outlet />;
};
