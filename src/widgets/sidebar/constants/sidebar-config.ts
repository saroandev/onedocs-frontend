import { v4 as uuidv4 } from "uuid";

export const SIDEBAR_MENU_IDS = {
  CHAT: uuidv4(),
  PLAYBOOK: uuidv4(),
  COLLECTION: uuidv4(),
  TEMPLATE: uuidv4(),
  TABLE: uuidv4(),
  CLIENT_PORTAL: uuidv4(),
  TIME_TRACK: uuidv4(),
  ADMIN: uuidv4(),
  PROFILE: uuidv4(),
};

export const SIDEBAR_MENU_TOP = [
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

export const SIDEBAR_MENU_BOTTOM = [
  {
    id: SIDEBAR_MENU_IDS.CLIENT_PORTAL,
    label: "Müvekkil Portal",
    icon: "Users",
  },
  {
    id: SIDEBAR_MENU_IDS.TIME_TRACK,
    label: "Zaman Takibi",
    icon: "Clock",
  },
  {
    id: SIDEBAR_MENU_IDS.ADMIN,
    label: "Yönetici Paneli",
    icon: "Shield",
  },
  {
    id: SIDEBAR_MENU_IDS.PROFILE,
    label: "Profil",
    icon: "User",
  },
];
