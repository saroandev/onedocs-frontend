export const SIDEBAR_MENU_IDS = {
  CHATS: "hukuk-asistani",
  PLAYBOOK: "playbook",
  COLLECTION: "koleksiyonlar",
  TEMPLATE: "template",
  TABLE: "table",
  CLIENT_PORTAL: "client-portal",
  TIME_TRACK: "time-track",
  ADMIN: "admin",
  PROFILE: "profile",
};

export const SIDEBAR_MENU_TOP = [
  {
    id: SIDEBAR_MENU_IDS.CHATS,
    label: "Sohbetler",
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
