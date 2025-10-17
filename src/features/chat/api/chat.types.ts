export interface CreateChatDto {
  collections?: [
    {
      name: string;
      scopes: string[];
    }
  ];
  include_low_confidence_sources?: boolean;
  max_sources_in_context?: number;
  min_relevance_score?: number;
  options?: {
    citations: true;
    lang: string;
    stream: boolean;
    tone: string;
  };
  question: string;
  sources?: string[];
  top_k?: number;
  use_reranker?: true;
}

export interface CreateChatResponse {
  answer: string;
  conversation_id: string;
  model_used: string;
  processing_time: number;
  remaining_credits: number;
  role: "assistant" | "user";
  sources: {
    chunk_text: string;
    document_id: string;
    document_title: string;
    page_number: number;
    score: number;
  }[];
  tokens_used: number;
}

export interface ConversationByIdDto {
  conversation_id: string;
  limit?: number;
}

export interface ConversationByIdMessage {
  content: string;
  created_at: string;
  message_id: string;
  processing_time: number;
  role: string;
  sources: string[];
  tokens_used: number;
}

export interface ConversationByIdResponse {
  conversation_id: string;
  last_message_at: string;
  message_count: number;
  messages: ConversationByIdMessage[];
  organization_id: string;
  started_at: string;
  user_id: string;
}

export interface AllConversationsDto {
  limit: number;
}

export interface AllConversationsResponse {
  conversations: {
    conversation_id: string;
    first_message_preview: string;
    last_message_at: string;
    message_count: number;
    started_at: string;
  }[];
  total_count: number;
}
