/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const useChatStore = create<ChatState>((set) => ({
  playbookAnalysisOpen: false,
  selectedPlaybookForAnalysis: null,
  conversationId: "",
  isCreatingMessage: false,
  lastAssistantMessageId: "",

  setPlaybookAnalysisOpen: (val) => set({ playbookAnalysisOpen: val }),
  setSelectedPlaybookForAnalysis: (val) => set({ selectedPlaybookForAnalysis: val }),
  setConversationId: (val) => set({ conversationId: val }),
  clearConversation: () => set({ conversationId: null }),
  setIsCreatingMessage: (val) => set({ isCreatingMessage: val }),
  setLastAssistantMessageId: (val) => set({ lastAssistantMessageId: val }),
}));

interface ChatState {
  playbookAnalysisOpen: boolean;
  selectedPlaybookForAnalysis: any | null;
  conversationId: string | null;
  isCreatingMessage: boolean;
  setPlaybookAnalysisOpen: (val: boolean) => void;
  setSelectedPlaybookForAnalysis: (val: any | null) => void;
  setConversationId: (val: string | null) => void;
  clearConversation: () => void;
  setIsCreatingMessage: (val: boolean) => void;
  lastAssistantMessageId: string;
  setLastAssistantMessageId: (val: string) => void;
}
