import { onedocsKnowledgeBaseApiClient } from "@/shared/lib/api";
import type {
  CollectionsDto,
  CollectionsResponse,
  CollectionCreateDocumentDto,
  CollectionCreateDocumentResponse,
  CollectionCreateDocumentsDto,
  CollectionCreateDocumentsResponse,
  CollectionDocumentsDto,
  CollectionDocumentsResponse,
  CollectionDto,
  CollectionResponse,
  CollectionDeleteDto,
  CollectionDeleteResponse,
  CreateCollectionDto,
  CreateCollectionResponse,
  CollectionDocumentDeleteDto,
  CollectionDocumentDeleteResponse,
} from "./collection.types";

export const collectionApi = {
  createCollection: async (data: CreateCollectionDto): Promise<CreateCollectionResponse> => {
    const response = await onedocsKnowledgeBaseApiClient.post<CreateCollectionResponse>(
      "collections",
      data
    );
    return response.data;
  },

  getCollections: async (data: CollectionsDto): Promise<CollectionsResponse> => {
    const { scope } = data;
    const response = await onedocsKnowledgeBaseApiClient.get<CollectionsResponse>("collections", {
      params: { scope },
    });
    return response.data;
  },

  getCollection: async (data: CollectionDto): Promise<CollectionResponse> => {
    const { collection_name, scope } = data;

    const response = await onedocsKnowledgeBaseApiClient.get<CollectionResponse>(
      `collections/${collection_name}`,
      {
        params: { scope },
      }
    );
    return response.data;
  },

  deleteCollection: async (data: CollectionDeleteDto): Promise<CollectionDeleteResponse> => {
    const { collection_name, scope } = data;

    const response = await onedocsKnowledgeBaseApiClient.delete<CollectionDeleteResponse>(
      `collections/${collection_name}`,
      {
        params: { scope },
      }
    );
    return response.data;
  },

  getCollectionDocuments: async (
    data: CollectionDocumentsDto
  ): Promise<CollectionDocumentsResponse[]> => {
    const { collection_name, scope } = data;

    const response = await onedocsKnowledgeBaseApiClient.get<CollectionDocumentsResponse[]>(
      `collections/${collection_name}/documents`,
      {
        params: { scope },
      }
    );
    return response.data;
  },

  createCollectionDocument: async (
    data: CollectionCreateDocumentDto
  ): Promise<CollectionCreateDocumentResponse> => {
    const { collection_name, file, scope } = data;

    const response = await onedocsKnowledgeBaseApiClient.post<CollectionCreateDocumentResponse>(
      `api/collections/${collection_name}/ingest`,
      { file, scope },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  createCollectionDocuments: async (
    data: CollectionCreateDocumentsDto
  ): Promise<CollectionCreateDocumentsResponse> => {
    const { collection_name, scope, files, max_files } = data;

    const response = await onedocsKnowledgeBaseApiClient.post<CollectionCreateDocumentsResponse>(
      `api/collections/${collection_name}/batch-ingest`,
      { files, scope },
      {
        params: { max_files },
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  deleteDocument: async (
    data: CollectionDocumentDeleteDto
  ): Promise<CollectionDocumentDeleteResponse> => {
    const { document_id, scope, collection } = data;

    const response = await onedocsKnowledgeBaseApiClient.delete<CollectionDocumentDeleteResponse>(
      `documents/${document_id}`,
      { params: { scope, collection } }
    );
    return response.data;
  },
};
