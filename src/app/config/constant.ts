export const APP_VERSION = "1.0.0";

export const APP_CONFIG = {
  name: "",
  version: APP_VERSION,
  description: "",
  author: "",
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth-token",
  THEME: "app-theme",
  SIDEBAR_STATE: "sidebar-minimized",
} as const;
