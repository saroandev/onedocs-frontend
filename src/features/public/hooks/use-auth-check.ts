import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/public.api";
import { usePublicStore } from "../store/public.store";

export const useAuthCheck = () => {
  const token = usePublicStore((state) => state.token);
  const setUser = usePublicStore((state) => state.setUser);
  //TODO
  return useQuery({
    queryKey: ["auth", "check"],
    queryFn: async () => {
      const user = await authApi.whoAmI();
      setUser(user);
      return user;
    },
    enabled: !!token,
    staleTime: Infinity,
    retry: false,
  });
};
