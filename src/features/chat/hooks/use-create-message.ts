/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChatStore } from "../store/chat.store";
import { chatApi } from "../api/chat.api";
import { showNotification } from "@/shared/lib/notification";
import type { CreateMessageDto, CreateMessageResponse } from "../api/chat.types";
import { useAppNavigation } from "@/shared/lib/navigation";
import { v4 as uuidv4 } from "uuid";
import { useUIStore } from "@/shared/store/ui.store";

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const conversationId = useChatStore((state) => state.conversationId);
  const setConversationId = useChatStore((state) => state.setConversationId);
  const setIsCreatingMessage = useChatStore((state) => state.setIsCreatingMessage);
  const setLastAssistantMessageId = useChatStore((state) => state.setLastAssistantMessageId);
  const { goTo } = useAppNavigation();
  const isModulePreloaded = useUIStore((state) => state.isModulePreloaded);
  const preloadModule = useUIStore((state) => state.preloadModule);

  const mutation = useMutation<CreateMessageResponse, Error, CreateMessageDto>({
    mutationFn: (data) => {
      const clientConversationId = conversationId;

      return chatApi.createMessage({
        ...data,
        conversation_id: clientConversationId,
      });
    },
    onMutate: async (newMessage) => {
      setIsCreatingMessage(true);

      let currentConversationId = conversationId;

      if (!conversationId) {
        if (!isModulePreloaded("chat/chat.page.tsx")) {
          await preloadModule("chat/chat.page.tsx");
        }

        const newClientId = uuidv4();
        currentConversationId = newClientId;
        setConversationId(newClientId);
        goTo(`/chat/${newClientId}`, { replace: true });
      }

      const queryKey = ["chat", currentConversationId];
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<CreateMessageDto[]>(queryKey);

      queryClient.setQueryData<CreateMessageDto[]>(queryKey, (old: any = []) => {
        if (!old || !old.messages) {
          return {
            conversation_id: currentConversationId,
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
          };
        }

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
        };
      });

      return {
        previousData,
        queryKey,
        clientConversationId: currentConversationId,
      };
    },

    onSuccess: (aiResponse: CreateMessageResponse, _variables, _context: any) => {
      const responseConversationId = aiResponse.conversation_id;

      const assistanMessageId = `assistant-${Date.now()}`;

      setLastAssistantMessageId(assistanMessageId);

      const queryKey = ["chat", responseConversationId];
      queryClient.setQueryData<any>(queryKey, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          conversation_id: responseConversationId,
          messages: [
            ...old.messages,
            {
              content: aiResponse.answer,
              role: "assistant",
              message_id: assistanMessageId,
              created_at: new Date().toISOString(),
              sources: aiResponse.sources,
              tokens_used: aiResponse.tokens_used,
              processing_time: aiResponse.processing_time,
            },
          ],
        };
      });
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

  return mutation;
};
