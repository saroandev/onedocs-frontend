import { useMutation } from "@tanstack/react-query";
import { chatApi } from "../api/chat.api";
import { useChatStore } from "../store/chat.store";

export const useGetSource = () => {
  const setSourceUrl = useChatStore((state) => state.setSourceUrl);
  const setIsLoadingSourceUrl = useChatStore((state) => state.setIsLoadingSourceUrl);
  const setShowPdfViewer = useChatStore((state) => state.setShowPdfViewer);
  const setHighlightText = useChatStore((state) => state.setHighlightText);

  return useMutation({
    mutationFn: chatApi.getSourceByChat,
    onMutate: async (variables) => {
      setIsLoadingSourceUrl(true);
      // Highlight text'i set et (PDF açılmadan önce)
      setHighlightText(variables.highlight_text || "");
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
