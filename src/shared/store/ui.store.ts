import { create } from "zustand";
import { preloadPageModule } from "../lib/module-loader";

export const useUIStore = create<UIState>((set, get) => ({
  tableName: "",
  tableColumns: [],
  dataGridOpen: false,
  editorContent: "",
  choosenTab: "",
  preloadedModules: new Set<string>(),

  setTableName: (val) => set({ tableName: val }),
  setTableColumns: (val) => set({ tableColumns: val }),
  setDataGridOpen: (val) => set({ dataGridOpen: val }),
  setEditorContent: (val) => set({ editorContent: val }),
  setChoosenTab: (val) => set({ choosenTab: val }),

  preloadModule: async (modulePath: string) => {
    const { preloadedModules } = get();

    if (preloadedModules.has(modulePath)) {
      return;
    }

    try {
      await preloadPageModule(modulePath);
      set((state) => ({
        preloadedModules: new Set([...state.preloadedModules, modulePath]),
      }));
    } catch (error) {
      console.error(`Failed to preload module: ${modulePath}`, error);
    }
  },

  isModulePreloaded: (modulePath: string) => {
    return get().preloadedModules.has(modulePath);
  },
}));

interface UIState {
  tableName: string;
  tableColumns: string[];
  dataGridOpen: boolean;
  editorContent: string;
  choosenTab: string;
  preloadedModules: Set<string>;
  setTableName: (val: string) => void;
  setTableColumns: (val: string[]) => void;
  setDataGridOpen: (val: boolean) => void;
  setEditorContent: (val: string) => void;
  setChoosenTab: (val: string) => void;
  preloadModule: (modulePath: string) => Promise<void>;
  isModulePreloaded: (modulePath: string) => boolean;
}
