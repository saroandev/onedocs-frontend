/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from "../api/auth.api";
import { showNotification } from "@/shared/lib/notification";
import { ROUTES } from "@/app/router/config/routes.config";
import { useAppNavigation } from "@/shared/lib/navigation";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  const { goTo } = useAppNavigation();

  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: () => {
      goTo(ROUTES.SIGN_IN, { replace: true });
      showNotification("success", "Hesap oluşturuldu");
    },
    onError: (error: any) => {
      showNotification("error", error?.response?.data?.detail[0]?.msg);
    },
  });
};
