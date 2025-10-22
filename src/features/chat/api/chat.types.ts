export interface CreateChatDto {
  conversation_id?: string;
  collections?: {
    name: string;
    scopes: ("shared" | "private")[];
  }[];
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
  total_sources_retrieved?: number;
  sources_after_filtering?: number;
  min_score_applied?: number;
  low_confidence_sources?: number | null;
}

export interface ConversationDto {
  conversation_id: string;
  limit?: number;
}

export interface ConversationMessage {
  content: string;
  created_at: string;
  message_id: string;
  processing_time: number;
  role: "user" | "assistant";
  sources: string[];
  tokens_used: number;
}

export interface ConversationResponse {
  conversation_id: string;
  last_message_at: string;
  message_count: number;
  messages: ConversationMessage[];
  organization_id: string;
  started_at: string;
  user_id: string;
}

export interface ConversationsDto {
  limit: number;
}

export interface ConversationsResponse {
  conversations: {
    conversation_id: string;
    first_message_preview: string;
    last_message_at: string;
    message_count: number;
    started_at: string;
  }[];
  total_count: number;
}

export interface ChatDeleteDto {
  conversation_id: string;
}

export interface ChatDeleteResponse {
  conversation_id: "conv-123";
  message: "Conversation deleted successfully";
  messages_deleted: 4;
}
