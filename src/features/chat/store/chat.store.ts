/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const useChatStore = create<UIState>((set) => ({
  messages: [],
  isResponding: false,
  playbookAnalysisOpen: false,
  selectedPlaybookForAnalysis: null,

  setMessages: (val) =>
    set((state) => ({
      messages: [...state.messages, val],
    })),
  setIsResponding: (val) => set({ isResponding: val }),
  setPlaybookAnalysisOpen: (val) => set({ playbookAnalysisOpen: val }),
  setSelectedPlaybookForAnalysis: (val) => set({ selectedPlaybookForAnalysis: val }),
}));

interface UIState {
  messages: ChatMessage[];
  isResponding: boolean;
  playbookAnalysisOpen: boolean;
  selectedPlaybookForAnalysis: any | null;
  setMessages: (val: ChatMessage) => void;
  setIsResponding: (val: boolean) => void;
  setPlaybookAnalysisOpen: (val: boolean) => void;
  setSelectedPlaybookForAnalysis: (val: any | null) => void;
}

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
};
