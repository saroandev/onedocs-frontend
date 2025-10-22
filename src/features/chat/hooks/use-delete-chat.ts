/* eslint-disable @typescript-eslint/no-explicit-any */
import { showNotification } from "@/shared/lib/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../api/chat.api";
import type { ChatDeleteDto } from "../api/chat.types";
import { useParams } from "react-router-dom";
import { useAppNavigation } from "@/shared/lib/navigation";
import { ROUTES } from "@/app/router/config/routes.config";

export const useDeleteChat = () => {
  const { conversationId: urlConversationId } = useParams<{ conversationId: string }>();
  const queryClient = useQueryClient();
  const { goTo } = useAppNavigation();

  return useMutation({
    mutationFn: (conversationId: ChatDeleteDto) => chatApi.deleteChat(conversationId),
    onSuccess: (response, variables) => {
      showNotification("success", response.message || "Sohbet başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["chats"] });

      if (variables.conversation_id === urlConversationId) {
        goTo(ROUTES.DASHBOARD);
      }
    },
  });
};
