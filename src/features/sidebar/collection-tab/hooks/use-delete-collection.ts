/* eslint-disable @typescript-eslint/no-explicit-any */
import { showNotification } from "@/shared/lib/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collectionApi } from "../api/collection.api";
import type { CollectionDeleteDto } from "../api/collection.types";

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CollectionDeleteDto) => collectionApi.deleteCollection(data),
    onSuccess: (response) => {
      showNotification("success", response.message || "Koleksiyon başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};
