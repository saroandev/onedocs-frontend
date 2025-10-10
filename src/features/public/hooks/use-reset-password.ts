/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from "../api/public.api";
import { showNotification } from "@/shared/lib/notification";
import { ROUTES } from "@/app/router/routes.config";
import { useAppNavigation } from "@/shared/lib/navigation";
import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
  const { goTo } = useAppNavigation();

  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      goTo(ROUTES.SIGN_IN, { replace: true });
      showNotification("success", "Hesap oluşturuldu");
    },
    onError: (_error: any) => {
      console.log("Bu e-posta adresi zaten kayıtlı"); //TODO
      showNotification("error", "Bu e-posta adresi zaten kayıtlı");
      showNotification("error", "Bir hata oluştu");
    },
  });
};
