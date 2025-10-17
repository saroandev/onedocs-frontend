import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../api/chat.api";
import { useChatStore } from "../store/chat.store";
import type { ConversationByIdResponse } from "../api/chat.types";

export const useGetChatById = () => {
  const conversationId = useChatStore((state) => state.conversationId);

  return useQuery<ConversationByIdResponse, Error>({
    queryKey: ["chat", conversationId],
    queryFn: () => chatApi.getChatById({ conversation_id: conversationId, limit: 100 }),
    enabled: !!conversationId,
    staleTime: 1000 * 60 * 5, // 5 dakika boyunca fresh say
    gcTime: 1000 * 60 * 30, // 30 dakika cache'de tut (önceden cacheTime)
    refetchOnWindowFocus: false, // Focus'ta tekrar çekme
    refetchOnMount: "always", // Mount'ta her zaman çek
  });
};
