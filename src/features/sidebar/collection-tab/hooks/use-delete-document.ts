/* eslint-disable @typescript-eslint/no-explicit-any */
import { showNotification } from "@/shared/lib/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collectionApi } from "../api/collection.api";
import type { CollectionDocumentDeleteDto } from "../api/collection.types";

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CollectionDocumentDeleteDto) => collectionApi.deleteDocument(data),
    onSuccess: (response) => {
      showNotification("success", response.message || "Dosya başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["collection-documents"] });
    },
  });
};
