/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from "../api/auth.api";
import { showNotification } from "@/shared/lib/notification";
import { useMutation } from "@tanstack/react-query";
import { useAppNavigation } from "@/shared/lib/navigation";
import { ROUTES } from "@/app/router/config/routes.config";

export const useForgotPassword = () => {
  const { goTo } = useAppNavigation();

  return useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      goTo(ROUTES.SIGN_IN, { replace: true });
      showNotification("success", "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi");
    },
  });
};
