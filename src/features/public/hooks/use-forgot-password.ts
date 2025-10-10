/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from "../api/public.api";
import { showNotification } from "@/shared/lib/notification";
import { useMutation } from "@tanstack/react-query";
import { useAppNavigation } from "@/shared/lib/navigation";
import { ROUTES } from "@/app/router/routes.config";

export const useForgotPassword = () => {
  const { goTo } = useAppNavigation();

  return useMutation({
    mutationFn: authApi.forgotPassword,
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
