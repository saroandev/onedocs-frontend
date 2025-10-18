import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../api/chat.api";
import { useChatStore } from "../store/chat.store";
import type { ConversationByIdResponse } from "../api/chat.types";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { showNotification } from "@/shared/lib/notification";

export const useGetChatById = () => {
  const { conversationId: urlConversationId } = useParams<{ conversationId: string }>();
  const setConversationId = useChatStore((state) => state.setConversationId);

  useEffect(() => {
    if (urlConversationId) {
      setConversationId(urlConversationId);
    }
  }, [urlConversationId, setConversationId]);

  return useQuery<ConversationByIdResponse, Error>({
    queryKey: ["chat", urlConversationId],
    queryFn: () => {
      //TODO
      if (!urlConversationId) {
        showNotification("error", "Conversation ID is required");
        throw new Error("Conversation ID is required");
      }
      return chatApi.getChatById({
        conversation_id: urlConversationId,
        limit: 100,
      });
    },
    enabled: !!urlConversationId, // Sadece conversationId varken çalış
    staleTime: 1000 * 60 * 5, // 5 dakika fresh
    gcTime: 1000 * 60 * 30, // 30 dakika cache
    refetchOnWindowFocus: false,
    retryDelay: 1000,
    retry: 2, // Network hatalarında 2 kez dene
    // refetchOnMount: "always", // Refresh için önemli
    // Sadece cache'de data yoksa fetch et. useCreateChat zaten cache'i güncelliyor, gereksiz fetch önleniyor
    refetchOnMount: (query) => {
      // Cache'de data yoksa veya stale ise fetch et
      // Bu sayede:
      // 1. Sayfa yenilendiğinde fetch eder (cache temizlenir)
      // 2. Başka sekmeden açıldığında fetch eder
      // 3. Normal mesajlaşmada fetch etmez (cache'de data var)
      return query.state.data === undefined;
    },
  });
};
