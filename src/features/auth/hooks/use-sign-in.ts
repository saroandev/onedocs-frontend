/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from "../api/auth.api";
import { showNotification } from "@/shared/lib/notification";
import { useAppNavigation } from "@/shared/lib/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { ROUTES } from "@/app/router/config/routes.config";

export const useSignIn = () => {
  const { goTo } = useAppNavigation();
  const setUser = useAuthStore((state) => state.setUser);
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (response) => {
      setUser(response);
      setTokens(response.access_token, response.refresh_token);
      goTo(ROUTES.DASHBOARD, { replace: true });
    },
    onError: (error: any) => {
      showNotification("error", error?.response?.data?.detail);
    },
  });
};
