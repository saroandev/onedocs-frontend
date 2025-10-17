import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChatStore } from "../store/chat.store";
import { showNotification } from "@/shared/lib/notification";
import type { CreateChatDto } from "../api/chat.types";

export const useSendMessageStreaming = () => {
  const queryClient = useQueryClient();
  const conversationId = useChatStore((state) => state.conversationId);

  return useMutation({
    mutationFn: async (userMessage: CreateChatDto) => {
      const queryKey = ["chat", conversationId];

      // 1. Kullanıcı mesajını ekle
      queryClient.setQueryData<CreateChatDto[]>(queryKey, (old = []) => [...old, userMessage]);

      // 2. AI mesajı için placeholder oluştur
      const aiMessageId = crypto.randomUUID();
      const aiMessage: CreateChatDto = {
        id: aiMessageId,
        content: "", // Boş başla
        role: "assistant",
        createdAt: Date.now(),
      };

      queryClient.setQueryData<CreateChatDto[]>(queryKey, (old = []) => [...old, aiMessage]);

      // 3. Streaming response'u dinle
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          conversationId,
        }),
      });

      if (!response.ok) throw new Error("Stream failed");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          fullContent += chunk;

          // Her chunk'ta AI mesajını güncelle
          queryClient.setQueryData<CreateChatDto[]>(queryKey, (old = []) =>
            old.map((msg) => (msg.id === aiMessageId ? { ...msg, content: fullContent } : msg))
          );
        }
      }

      return { aiMessageId, fullContent };
    },

    onError: (error) => {
      showNotification("error", "Mesaj gönderilemedi");
      console.error("Streaming error:", error);
    },
  });
};

// KULLANIMI:
// const { mutate: createChat, isPending } = useSendMessageStreaming();
// createChat(userMessage);
