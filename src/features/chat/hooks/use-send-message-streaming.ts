import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChatStore } from "../store/chat.store";
import type { CreateMessageDto } from "../api/chat.types";

export const useSendMessageStreaming = () => {
  const queryClient = useQueryClient();
  const conversationId = useChatStore((state) => state.conversationId);

  return useMutation({
    mutationFn: async (userMessage: CreateMessageDto) => {
      const queryKey = ["chat", conversationId];

      // 1. Kullanıcı mesajını ekle
      queryClient.setQueryData<CreateMessageDto[]>(queryKey, (old = []) => [...old, userMessage]);

      // 2. AI mesajı için placeholder oluştur
      const aiMessageId = crypto.randomUUID();
      const aiMessage: CreateMessageDto = {
        id: aiMessageId,
        content: "", // Boş başla
        role: "assistant",
        createdAt: Date.now(),
      };

      queryClient.setQueryData<CreateMessageDto[]>(queryKey, (old = []) => [...old, aiMessage]);

      // 3. Streaming response'u dinle
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage?.content,
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
          queryClient.setQueryData<CreateMessageDto[]>(queryKey, (old = []) =>
            old.map((msg) => (msg.id === aiMessageId ? { ...msg, content: fullContent } : msg))
          );
        }
      }

      return { aiMessageId, fullContent };
    },
  });
};

// KULLANIMI:
// const { mutate: createMessage, isPending } = useSendMessageStreaming();
// createMessage(userMessage);
