import { create } from "zustand";

export const useUIStore = create<UIState>((set) => ({
  tableName: "",
  tableColumns: [],
  dataGridOpen: false,
  editorOpen: false,
  editorContent: "",
  choosenTab: "",

  setTableName: (val) => set({ tableName: val }),
  setTableColumns: (val) => set({ tableColumns: val }),
  setDataGridOpen: (val) => set({ dataGridOpen: val }),
  setEditorOpen: (val) => set({ editorOpen: val }),
  setEditorContent: (val) => set({ editorContent: val }),
  setChoosenTab: (val) => set({ choosenTab: val }),
}));

interface UIState {
  tableName: string;
  tableColumns: string[];
  dataGridOpen: boolean;
  editorOpen: boolean;
  editorContent: string;
  choosenTab: string;
  setTableName: (val: string) => void;
  setTableColumns: (val: string[]) => void;
  setDataGridOpen: (val: boolean) => void;
  setEditorOpen: (val: boolean) => void;
  setEditorContent: (val: string) => void;
  setChoosenTab: (val: string) => void;
}
