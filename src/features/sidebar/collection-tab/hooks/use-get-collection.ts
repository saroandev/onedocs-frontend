import { useQuery } from "@tanstack/react-query";
import { collectionApi } from "../api/collection.api";
import type { CollectionDto } from "../api/collection.types";

export const useGetCollection = (data: CollectionDto) => {
  return useQuery({
    queryKey: ["collection", data.collection_name, data.scope],
    queryFn: () => collectionApi.getCollection(data),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
