import { PageLoader } from "./page-loader";
import { Navigate } from "react-router-dom";
import type { AppRoute } from "./types/router.types";
import { ROUTES } from "./config/routes.config";

export const publicRoutes: AppRoute[] = [
  {
    path: ROUTES.SIGN_IN,
    index: true,
    element: (
      <PageLoader key="SignInPage" moduleName="SignInPage" modulePath="auth/sign-in.page.tsx" />
    ),
  },
  {
    path: ROUTES.SIGN_UP,
    element: (
      <PageLoader key="SignUpPage" moduleName="SignUpPage" modulePath="auth/sign-up.page.tsx" />
    ),
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: (
      <PageLoader
        key="ForgotPasswordPage"
        moduleName="ForgotPasswordPage"
        modulePath="auth/forgot-password.page.tsx"
      />
    ),
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: (
      <PageLoader
        key="ResetPasswordPage"
        moduleName="ResetPasswordPage"
        modulePath="auth/reset-password.page.tsx"
      />
    ),
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.SIGN_IN} replace />,
  },
];
