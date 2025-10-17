/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const useChatStore = create<UIState>((set) => ({
  playbookAnalysisOpen: false,
  selectedPlaybookForAnalysis: null,
  conversationId: "",

  setPlaybookAnalysisOpen: (val) => set({ playbookAnalysisOpen: val }),
  setSelectedPlaybookForAnalysis: (val) => set({ selectedPlaybookForAnalysis: val }),
  setConversationId: (val) => set({ conversationId: val }),
}));

interface UIState {
  playbookAnalysisOpen: boolean;
  selectedPlaybookForAnalysis: any | null;
  conversationId: string;
  setPlaybookAnalysisOpen: (val: boolean) => void;
  setSelectedPlaybookForAnalysis: (val: any | null) => void;
  setConversationId: (val: string) => void;
}
