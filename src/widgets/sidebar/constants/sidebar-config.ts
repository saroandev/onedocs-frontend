import { v4 as uuidv4 } from "uuid";

export const SIDEBAR_MENU_IDS = {
  CHAT: uuidv4(),
  PLAYBOOK: uuidv4(),
  COLLECTION: uuidv4(),
  TEMPLATE: uuidv4(),
  TABLE: uuidv4(),
};

export const SIDEBAR_MENU = [
  {
    id: SIDEBAR_MENU_IDS.CHAT,
    label: "Hukuk Asistanı",
    icon: "MessageSquare",
  },
  {
    id: SIDEBAR_MENU_IDS.COLLECTION,
    label: "Koleksiyonlar",
    icon: "Library",
  },
  {
    id: SIDEBAR_MENU_IDS.PLAYBOOK,
    label: "Playbooklar",
    icon: "BookMarked",
  },
  {
    id: SIDEBAR_MENU_IDS.TEMPLATE,
    label: "Şablonlar",
    icon: "FileText",
  },
  {
    id: SIDEBAR_MENU_IDS.TABLE,
    label: "Tablolar",
    icon: "Table",
  },
];
