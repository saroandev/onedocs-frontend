/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from "../api/auth.api";
import { showNotification } from "@/shared/lib/notification";
import { ROUTES } from "@/app/router/config/routes.config";
import { useAppNavigation } from "@/shared/lib/navigation";
import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
  const { goTo } = useAppNavigation();

  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      goTo(ROUTES.SIGN_IN, { replace: true });
      showNotification("success", "Şifre değişikliği tamamlandı");
    },
    onError: (_error: any) => {
      showNotification("error", "Bir hata oluştu");
    },
  });
};
