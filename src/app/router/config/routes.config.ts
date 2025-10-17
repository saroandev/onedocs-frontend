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

  // Error pages
  ERROR_404: "/404",
  ERROR_500: "/500",
} as const;

export const getWebsiteDetailRoute = (id: string) => `/websites/${id}`;

export const PUBLIC_ROUTES = [
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
];

// Protected routes list (for auth checks)
export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.PROFILE, ROUTES.SETTINGS];
