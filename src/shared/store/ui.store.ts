import { create } from "zustand";

export const useUIStore = create<UIState>((set) => ({
  showUserDropdown: false,
  showNotificationDropdown: false,
  showMobileMenu: false,
  isActiveSidemenuMinimize: false,
  isActiveSidemenuTablet: false,

  setUserDropdown: (show) => set({ showUserDropdown: show }),

  setNotificationDropdown: (show) => set({ showNotificationDropdown: show }),

  setMobileMenu: (show) => set({ showMobileMenu: show }),

  setSidemenuMinimize: (active) => set({ isActiveSidemenuMinimize: active }),

  setSidemenuTablet: (active) => set({ isActiveSidemenuTablet: active }),
}));

interface UIState {
  showUserDropdown: boolean;
  showNotificationDropdown: boolean;
  showMobileMenu: boolean;
  isActiveSidemenuMinimize: boolean;
  isActiveSidemenuTablet: boolean;
  setUserDropdown: (show: boolean) => void;
  setNotificationDropdown: (show: boolean) => void;
  setMobileMenu: (show: boolean) => void;
  setSidemenuMinimize: (active: boolean) => void;
  setSidemenuTablet: (active: boolean) => void;
}
