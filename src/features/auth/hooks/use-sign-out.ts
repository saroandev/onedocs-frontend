import { authApi } from "../api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useAppNavigation } from "@/shared/lib/navigation";
import { ROUTES } from "@/app/router/config/routes.config";
import { useAuthStore } from "../store/auth.store";

export const useSignOut = () => {
  const { goTo } = useAppNavigation();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: authApi.signOut,
    onSuccess: () => {
      logout();
      goTo(ROUTES.SIGN_IN, { replace: true });
    },
  });
};
