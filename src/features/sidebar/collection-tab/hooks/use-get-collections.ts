import { useQuery } from "@tanstack/react-query";
import { collectionApi } from "../api/collection.api";
import type { CollectionsDto } from "../api/collection.types";

export const useGetCollections = (query: CollectionsDto = { query: "all" }) => {
  return useQuery({
    queryKey: ["collections", query],
    queryFn: () => collectionApi.getCollections(query),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
