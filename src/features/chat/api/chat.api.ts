import { onedocsKnowledgeBaseApiClient } from "@/shared/lib/api/http-client";
import type {
  AllConversationsDto,
  AllConversationsResponse,
  ConversationByIdDto,
  ConversationByIdResponse,
  CreateChatDto,
  CreateChatResponse,
} from "./chat.types";

export const chatApi = {
  createChat: async (data: CreateChatDto): Promise<CreateChatResponse> => {
    const response = await onedocsKnowledgeBaseApiClient.post<CreateChatResponse>(
      "chat/process",
      data
    );
    return response.data;
  },

  getAllChats: async (query?: AllConversationsDto): Promise<AllConversationsResponse> => {
    const response = await onedocsKnowledgeBaseApiClient.get<AllConversationsResponse>(
      "conversations",
      {
        params: query,
      }
    );

    return response.data;
  },

  getChatById: async (query: ConversationByIdDto): Promise<ConversationByIdResponse> => {
    const { conversation_id, limit } = query;

    const response = await onedocsKnowledgeBaseApiClient.get<ConversationByIdResponse>(
      `conversations/${conversation_id}`,
      {
        params: { limit },
      }
    );

    return response.data;
  },
};
