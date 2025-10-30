/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const useChatStore = create<ChatState>((set) => ({
  playbookAnalysisOpen: false,
  selectedPlaybookForAnalysis: null,
  conversationId: "",
  isCreatingMessage: false,
  lastAssistantMessageId: "",
  sourceUrl: "",
  isLoadingSourceUrl: false,
  showPdfViewer: false,
  pdfHighlightText: "",
  // processedSources: new Set<string>(),

  setPlaybookAnalysisOpen: (val) => set({ playbookAnalysisOpen: val }),
  setSelectedPlaybookForAnalysis: (val) => set({ selectedPlaybookForAnalysis: val }),
  setConversationId: (val) => set({ conversationId: val }),
  clearConversation: () => set({ conversationId: null }),
  setIsCreatingMessage: (val) => set({ isCreatingMessage: val }),
  setLastAssistantMessageId: (val) => set({ lastAssistantMessageId: val }),
  setSourceUrl: (val) => set({ sourceUrl: val }),
  setIsLoadingSourceUrl: (val) => set({ isLoadingSourceUrl: val }),
  setShowPdfViewer: (val) => set({ showPdfViewer: val }),
  setPdfHighlightText: (val) => set({ pdfHighlightText: val }),
  // setProcessedSources: (val) =>
  // set((state) => ({
  //   processedSources: new Set([...state.processedSources, val]),
  // })),
}));

interface ChatState {
  playbookAnalysisOpen: boolean;
  selectedPlaybookForAnalysis: any | null;
  conversationId: string | null;
  isCreatingMessage: boolean;
  showPdfViewer: boolean;
  lastAssistantMessageId: string;
  sourceUrl: string;
  isLoadingSourceUrl: boolean;
  pdfHighlightText: string;
  // processedSources: Set<string>;
  setPlaybookAnalysisOpen: (val: boolean) => void;
  setSelectedPlaybookForAnalysis: (val: any | null) => void;
  setConversationId: (val: string | null) => void;
  clearConversation: () => void;
  setIsCreatingMessage: (val: boolean) => void;
  setLastAssistantMessageId: (val: string) => void;
  setSourceUrl: (val: string) => void;
  setIsLoadingSourceUrl: (val: boolean) => void;
  setShowPdfViewer: (val: boolean) => void;
  setPdfHighlightText: (val: string) => void;
  // setProcessedSources: (val: string) => void;
}
