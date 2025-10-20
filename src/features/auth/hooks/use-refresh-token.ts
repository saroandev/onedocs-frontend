import { authApi } from "../api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useAppNavigation } from "@/shared/lib/navigation";
import { ROUTES } from "@/app/router/config/routes.config";

export const useRefreshToken = () => {
  const { goTo } = useAppNavigation();

  return useMutation({
    mutationFn: authApi.refreshToken,
    onSuccess: () => {
      goTo(ROUTES.SIGN_IN, { replace: true });
    },
  });
};
