import { onedocsKnowledgeBaseApiClient } from "@/shared/lib/api/http-client";
import type {
  ConversationsDto,
  ConversationsResponse,
  ConversationDto,
  ConversationResponse,
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

  getChats: async (query?: ConversationsDto): Promise<ConversationsResponse> => {
    const response = await onedocsKnowledgeBaseApiClient.get<ConversationsResponse>(
      "conversations",
      {
        params: query,
      }
    );
    return response.data;
  },

  getChat: async (query: ConversationDto): Promise<ConversationResponse> => {
    const { conversation_id, limit } = query;

    const response = await onedocsKnowledgeBaseApiClient.get<ConversationResponse>(
      `conversations/${conversation_id}`,
      {
        params: { limit },
      }
    );
    return response.data;
  },
};
