import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../api/chat.api";
import type { ConversationsResponse } from "../api/chat.types";

export const useGetChats = () => {
  return useQuery<ConversationsResponse, Error>({
    queryKey: ["allChats"],
    queryFn: () => chatApi.getChats({ limit: 20 }),
    staleTime: 1000 * 60 * 5, // 5 dakika boyunca fresh say
    gcTime: 1000 * 60 * 30, // 30 dakika cache'de tut (önceden cacheTime)
    refetchOnWindowFocus: false, // Focus'ta tekrar çekme
    refetchOnMount: "always", // Mount'ta her zaman çek
  });
};
