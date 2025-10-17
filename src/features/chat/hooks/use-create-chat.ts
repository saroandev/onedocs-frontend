/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChatStore } from "../store/chat.store";
import { chatApi } from "../api/chat.api";
import { showNotification } from "@/shared/lib/notification";
import type { CreateChatDto, CreateChatResponse } from "../api/chat.types";

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  const conversationId = useChatStore((state) => state.conversationId);

  return useMutation<CreateChatResponse, Error, CreateChatDto>({
    mutationFn: chatApi.createChat,
    onMutate: async (newMessage) => {
      console.log({ newMessage });

      const queryKey = ["chat", conversationId];

      await queryClient.cancelQueries({ queryKey });

      const previousMessages = queryClient.getQueryData<CreateChatDto[]>(queryKey);

      queryClient.setQueryData<CreateChatDto[]>(queryKey, (old = []) => [...old, newMessage]);

      return { previousMessages };
    },

    //TODO
    onSuccess: (aiResponse: any, variables, context) => {
      const queryKey = ["chat", conversationId];

      console.log({ queryKey });

      queryClient.setQueryData<CreateChatDto[]>(queryKey, (old = []) => [...old, aiResponse]);
    },

    onError: (error, variables, context: any) => {
      const queryKey = ["chat", conversationId];

      // TODO
      if (context?.previousMessages) {
        queryClient.setQueryData(queryKey, context.previousMessages);
      }

      showNotification("error", "Mesaj gönderilemedi");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat", conversationId],
      });
    },
  });
};
