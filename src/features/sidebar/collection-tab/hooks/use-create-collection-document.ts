/* eslint-disable @typescript-eslint/no-explicit-any */
import { showNotification } from "@/shared/lib/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collectionApi } from "../api/collection.api";
import type { CollectionCreateDocumentDto } from "../api/collection.types";

export const useCreateCollectionDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CollectionCreateDocumentDto) => collectionApi.createCollectionDocument(data),
    onSuccess: (response, variables) => {
      showNotification("success", response.message || "Dosya başarıyla yüklendi");
      // İlgili collection'ın documents listesini yeniden yükle
      queryClient.invalidateQueries({
        queryKey: ["collection-documents", variables.collection_name, variables.scope],
      });
      // Collection detayını da yenile (dosya sayısı vs. güncellensin)
      queryClient.invalidateQueries({
        queryKey: ["collection", variables.collection_name, variables.scope],
      });
      // Ana collections listesini de yenile
      // queryClient.invalidateQueries({ queryKey: ["collections"] }); //TODO
    },
  });
};
