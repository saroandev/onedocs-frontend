import { onedocsKnowledgeBaseApiClient } from "@/shared/lib/api/http-client";
import { ENV } from "@/app/config/env";
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
    // ✅ DİREKT MinIO URL kullan - Backend proxy gerekli değil!
    // MinIO URL'i tarayıcıda zaten açılıyor, CORS sorunu yok
    const { document_url } = data;

    // 🔒 Mixed Content Fix: HTTP → HTTPS (frontend HTTPS üzerinden çalıştığı için)
    const secureUrl = document_url.replace(/^http:\/\//i, "https://");

    console.log("✅ Using direct MinIO URL (HTTP→HTTPS):", secureUrl);

    // Response formatını koruyoruz (eski API ile uyumlu)
    return {
      url: secureUrl, // ← HTTPS MinIO URL!
      document_id: document_url.split('/').pop()?.split('?')[0] || "",
      source_type: "pdf",
      expires_in: 3600
    };
  },
};
