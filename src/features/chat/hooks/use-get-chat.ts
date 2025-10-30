/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../api/chat.api";
import { useChatStore } from "../store/chat.store";
import type { ConversationResponse } from "../api/chat.types";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const useGetChat = () => {
  const { conversationId: urlConversationId } = useParams<{ conversationId: string }>();
  const setConversationId = useChatStore((state) => state.setConversationId);

  useEffect(() => {
    if (urlConversationId) {
      setConversationId(urlConversationId);
    }
  }, [urlConversationId, setConversationId]);

  return useQuery<ConversationResponse, any>({
    queryKey: ["chat", urlConversationId || "new"],
    queryFn: () => {
      if (!urlConversationId) {
        throw new Error("Conversation ID is required");
      }
      return chatApi.getChat({
        conversation_id: urlConversationId,
        limit: 100,
      });
    },
    enabled: !!urlConversationId, // Sadece conversationId varken çalış
    staleTime: 1000 * 60 * 5, // 5 dakika fresh
    gcTime: 1000 * 60 * 30, // 30 dakika cache
    refetchOnWindowFocus: false,
    retryDelay: 1000,
    retry: 1, // Network hatalarında 1 kez dene
    // refetchOnMount: "always", // Refresh için önemli
    // Sadece cache'de data yoksa fetch et. useCreateMessage zaten cache'i güncelliyor, gereksiz fetch önleniyor
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
