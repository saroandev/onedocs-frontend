import { useQuery } from "@tanstack/react-query";
import { collectionApi } from "../api/collection.api";
import type { CollectionsDto } from "../api/collection.types";

export const useGetCollections = (
  scope: CollectionsDto = { scope: "all" },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["collections", scope],
    queryFn: () => collectionApi.getCollections(scope),
    retry: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: "always", // her mount'ta yeniden fetch et
    // staleTime: 0, // cache'i hemen stale yap
    enabled,
  });
};
