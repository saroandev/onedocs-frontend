export const ROUTES = {
  // Auth routes
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // Dashboard routes
  DASHBOARD: "/",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  CHAT: "/chat/:conversationId",

  // Error pages
  ERROR_404: "/404",
  ERROR_500: "/500",
} as const;
