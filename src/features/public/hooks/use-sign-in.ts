/* eslint-disable @typescript-eslint/no-unused-vars */
import { authApi } from "../api/public.api";
import { showNotification } from "@/shared/lib/notification";
import { useAppNavigation } from "@/shared/lib/navigation";
import { useMutation } from "@tanstack/react-query";
import { usePublicStore } from "../store/public.store";

export const useSignIn = () => {
  const { goTo } = useAppNavigation();
  const setUser = usePublicStore((state) => state.setUser);
  const setToken = usePublicStore((state) => state.setToken);

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (response) => {
      console.log({ response });
      // setUser(response.message);
      // setToken(response.message);
      // goTo(ROUTES.DASHBOARD, { replace: true });
    },
    onError: () => {
      showNotification("error", "Bir hata oluştu");
    },
  });
};
