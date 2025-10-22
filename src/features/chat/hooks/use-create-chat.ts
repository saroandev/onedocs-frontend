/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChatStore } from "../store/chat.store";
import { chatApi } from "../api/chat.api";
import { showNotification } from "@/shared/lib/notification";
import type { CreateChatDto, CreateChatResponse } from "../api/chat.types";
import { useAppNavigation } from "@/shared/lib/navigation";
import { useEffect } from "react";
import { preloadPageModule } from "@/shared/lib/preload/preload";

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  const conversationId = useChatStore((state) => state.conversationId);
  const setConversationId = useChatStore((state) => state.setConversationId);
  const setIsCreatingMessage = useChatStore((state) => state.setIsCreatingMessage);
  const { goTo } = useAppNavigation();

  const mutation = useMutation<CreateChatResponse, Error, CreateChatDto>({
    mutationFn: (data) => {
      // Eğer mevcut bir conversation'dayız, conversationId'yi ekle
      const requestData = conversationId ? { ...data, conversation_id: conversationId } : data;

      return chatApi.createChat(requestData);
    },
    onMutate: async (newMessage) => {
      setIsCreatingMessage(true);
      await preloadPageModule("chat/chat.page.tsx");

      // Eğer conversationId varsa, mevcut conversation'a mesaj ekliyoruz
      const queryKey = conversationId ? ["chat", conversationId] : ["chat", "new"]; // Yeni conversation için temporary key

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<CreateChatDto[]>(queryKey);

      // Optimistic update: Kullanıcı mesajını hemen göster
      queryClient.setQueryData<CreateChatDto[]>(queryKey, (old: any = []) => {
        // Yeni conversation (old undefined veya null)
        if (!old || !old.messages) {
          return {
            // conversation_id:  "temp",
            messages: [
              {
                content: newMessage.question,
                role: "user",
                message_id: `temp-${Date.now()}`,
                created_at: new Date().toISOString(),
                sources: [],
                tokens_used: 0,
                processing_time: 0,
              },
            ],
            // message_count: 1,
            // started_at: new Date().toISOString(),
            // last_message_at: new Date().toISOString(),
          };
        }

        // Mevcut conversation'a mesaj ekle
        return {
          ...old,
          messages: [
            ...old.messages,
            {
              content: newMessage.question,
              role: "user",
              message_id: `temp-${Date.now()}`,
              created_at: new Date().toISOString(),
              sources: [],
              tokens_used: 0,
              processing_time: 0,
            },
          ],
          // message_count: (old.message_count || 0) + 1,
          // last_message_at: new Date().toISOString(),
        };
      });

      return { previousData, queryKey };
    },

    onSuccess: (aiResponse: CreateChatResponse, variables, _context) => {
      const responseConversationId = aiResponse.conversation_id;

      // Eğer yeni bir conversation ise (ilk mesaj), navigate et
      if (!conversationId && responseConversationId) {
        setConversationId(responseConversationId);

        goTo(`/chat/${responseConversationId}`, { replace: true });

        // Cache'i güncelle (kullanıcı mesajı zaten optimistic update'te eklendi)
        const queryKey = ["chat", responseConversationId];
        queryClient.setQueryData<any>(queryKey, {
          conversation_id: responseConversationId,
          messages: [
            {
              content: variables.question,
              role: "user",
              message_id: `user-${Date.now()}`,
              created_at: new Date().toISOString(),
              sources: [],
              tokens_used: 0,
              processing_time: 0,
            },
            {
              content: aiResponse.answer,
              role: "assistant",
              message_id: `assistant-${Date.now()}`,
              created_at: new Date().toISOString(),
              sources: aiResponse.sources,
              tokens_used: aiResponse.tokens_used,
              processing_time: aiResponse.processing_time,
            },
          ],
          // message_count: 2,
          // started_at: new Date().toISOString(),
          // last_message_at: new Date().toISOString(),
        });
      } else {
        // Mevcut conversation'a AI cevabını ekle
        const queryKey = ["chat", conversationId];
        queryClient.setQueryData<any>(queryKey, (old: any) => {
          if (!old) return old;
          return {
            ...old,
            messages: [
              ...old.messages,
              {
                content: aiResponse.answer,
                role: "assistant",
                message_id: `assistant-${Date.now()}`,
                created_at: new Date().toISOString(),
                sources: aiResponse.sources,
                tokens_used: aiResponse.tokens_used,
                processing_time: aiResponse.processing_time,
              },
            ],
            // message_count: (old.message_count || 0) + 1,
            // last_message_at: new Date().toISOString(),
          };
        });
      }
      // Geçici cache'i temizle
      queryClient.removeQueries({ queryKey: ["chat", "new"], exact: true });
      setIsCreatingMessage(false);
    },

    onError: (error: any, _variables, context: any) => {
      // Rollback optimistic update
      if (context?.previousData && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousData);
      }

      setIsCreatingMessage(false);
      showNotification("error", error?.response?.data?.detail || "Bir hata oluştu");
    },
  });

  // isPending değiştiğinde store'u güncelle (fallback)
  useEffect(() => {
    setIsCreatingMessage(mutation.isPending);
  }, [mutation.isPending, setIsCreatingMessage]);

  return mutation;
};
