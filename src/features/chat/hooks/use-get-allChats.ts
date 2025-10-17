import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../api/chat.api";
import type { AllConversationsResponse } from "../api/chat.types";

export const useGetAllChats = () => {
  return useQuery<AllConversationsResponse[], Error>({
    queryKey: ["allChats"],
    queryFn: () => chatApi.getAllChats({ limit: 20 }),
    staleTime: 1000 * 60 * 5, // 5 dakika boyunca fresh say
    gcTime: 1000 * 60 * 30, // 30 dakika cache'de tut (önceden cacheTime)
    refetchOnWindowFocus: false, // Focus'ta tekrar çekme
    refetchOnMount: "always", // Mount'ta her zaman çek
  });
};
