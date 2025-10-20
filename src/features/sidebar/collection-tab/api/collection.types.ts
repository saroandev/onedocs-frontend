export interface CreateCollectionDto {
  description: string;
  name: string;
  scope: string;
}

export interface CreateCollectionResponse {
  collection: {
    chunk_count: number;
    created_at: string;
    created_by: string;
    created_by_email: string;
    description: string;
    document_count: number;
    milvus_collection_name: string;
    minio_prefix: string;
    name: string;
    scope: string;
    size_bytes: number;
    size_mb: number;
  };
  message: string;
}

export interface CollectionsDto {
  query: "private" | "shared" | "all" | "";
}

export interface CollectionsResponse {
  collections: {
    chunk_count: number;
    created_at: string;
    created_by: string;
    created_by_email: string;
    document_count: number;
    milvus_collection_name: string;
    minio_prefix: string;
    name: string;
    scope: string;
    size_bytes: number;
    size_mb: number;
    updated_at: string;
  }[];
  scope_filter: string;
  total_count: number;
}

export interface CollectionDto {
  collection_name: string;
  scope: "private" | "shared";
}

export interface CollectionResponse {
  chunk_count: number;
  created_at: string;
  created_by: string;
  created_by_email: string;
  description: string;
  document_count: number;
  metadata: {
    category: string;
  };
  milvus_collection_name: string;
  minio_prefix: string;
  name: string;
  scope: string;
  size_bytes: 5242880;
  size_mb: number;
  updated_at: string;
}

export interface CollectionDeleteDto {
  collection_name: string;
  scope: "private" | "shared";
}

export interface CollectionDeleteResponse {
  chunks_deleted: number;
  collection_name: string;
  documents_deleted: number;
  message: string;
  scope: string;
}

export interface CollectionDocumentsDto {
  collection_name: string;
  scope: "private" | "shared";
}

export interface CollectionDocumentsResponse {
  //?array response
  chunks_count: number;
  collection_name: string;
  created_at: string;
  document_id: string;
  document_type: string;
  file_hash: string;
  metadata: {
    category: string;
    pages: number;
  };
  scope: string;
  size_bytes: number;
  size_mb: number;
  title: string;
  uploaded_by: string;
  uploaded_by_email: string;
  url: string;
}

export interface CollectionCreateDocumentDto {
  collection_name: string;
  file: File;
  scope: "private" | "shared";
}

export interface CollectionCreateDocumentResponse {
  chunking_stats: {
    avg_chars_per_chunk: number;
    avg_tokens_per_chunk: number;
    chunk_overlap: number;
    chunk_size_target: number;
    method: string;
  };
  chunks_created: number;
  document_id: string;
  document_title: string;
  document_type: string;
  file_hash: string;
  message: string;
  page_count: number;
  processing_time: number;
  scope_info: {
    bucket_name: string;
    collection_name: string;
    scope_type: string;
  };
  stage_timings: {
    chunking: number;
    embedding: number;
    indexing: number;
    parsing: number;
    storage: number;
    validation: number;
  };
  success: boolean;
  uploaded_at: string;
  validation_status: string;
  validation_warnings: string[];
}

export interface CollectionCreateDocumentsDto {
  collection_name: string;
  max_files?: number;
  files: string[];
  scope?: "private" | "shared";
}

export interface CollectionCreateDocumentsResponse {
  failed: number;
  message: string;
  results: {
    chunks_created: number;
    document_id: string;
    file_hash: string;
    filename: string;
    processing_time: number;
    status: string;
  }[];
  skipped: number;
  successful: number;
  total_files: number;
  total_processing_time: number;
}
