/* eslint-disable @typescript-eslint/no-explicit-any */
import { showNotification } from "@/shared/lib/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collectionApi } from "../api/collection.api";
import type { CreateCollectionDto } from "../api/collection.types";

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCollectionDto) => collectionApi.createCollection(data),
    onSuccess: (response) => {
      showNotification("success", response.message || "Koleksiyon başarıyla oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};
