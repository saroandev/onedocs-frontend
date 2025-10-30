import { onedocsKnowledgeBaseApiClient } from "@/shared/lib/api/http-client";
import type {
  ConversationsDto,
  ConversationsResponse,
  ConversationDto,
  ConversationResponse,
  CreateMessageDto,
  CreateMessageResponse,
  ChatDeleteDto,
  ChatDeleteResponse,
  ChatSourceDto,
  ChatSourceResponse,
} from "./chat.types";

export const chatApi = {
  createMessage: async (data: CreateMessageDto): Promise<CreateMessageResponse> => {
    const response = await onedocsKnowledgeBaseApiClient.post<CreateMessageResponse>(
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

  deleteChat: async (data: ChatDeleteDto): Promise<ChatDeleteResponse> => {
    const { conversation_id } = data;

    const response = await onedocsKnowledgeBaseApiClient.delete<ChatDeleteResponse>(
      `conversations/${conversation_id}`
    );
    return response.data;
  },

  getSourceByChat: async (data: ChatSourceDto): Promise<ChatSourceResponse> => {
    const response = await onedocsKnowledgeBaseApiClient.post<ChatSourceResponse>(
      "docs/presign",
      data
    );
    return response.data;
  },
};
