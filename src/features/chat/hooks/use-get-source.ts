import { useMutation } from "@tanstack/react-query";
import { chatApi } from "../api/chat.api";
import { useChatStore } from "../store/chat.store";

export const useGetSource = () => {
  const setSourceUrl = useChatStore((state) => state.setSourceUrl);
  const setIsLoadingSourceUrl = useChatStore((state) => state.setIsLoadingSourceUrl);
  const setShowPdfViewer = useChatStore((state) => state.setShowPdfViewer);

  return useMutation({
    mutationFn: chatApi.getSourceByChat,
    onMutate: async () => {
      setIsLoadingSourceUrl(true);
    },
    onSuccess: (response) => {
      setSourceUrl(response.url);
      setShowPdfViewer(true);
    },
    onSettled: () => {
      setIsLoadingSourceUrl(false);
    },
  });
};
