import { useQuery } from "@tanstack/react-query";
import { collectionApi } from "../api/collection.api";
import type { CollectionDocumentsDto } from "../api/collection.types";

export const useGetCollectionDocuments = (data: CollectionDocumentsDto) => {
  return useQuery({
    queryKey: ["collection-documents", data.collection_name, data.scope],
    queryFn: () => collectionApi.getCollectionDocuments(data),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
