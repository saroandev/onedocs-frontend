/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ComponentType, lazy, type LazyExoticComponent } from "react";
import { ROUTES } from "./routes.config";

interface Route {
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
}

interface RouteGroup {
  public: Route[];
  protected: Route[];
}

const createLazy = (
  importPath: () => Promise<any>,
  exportName: string
): LazyExoticComponent<ComponentType<any>> => {
  return lazy(() =>
    importPath().then((module) => ({
      default: module[exportName],
    }))
  );
};

export const routes: RouteGroup = {
  public: [
    {
      path: ROUTES.SIGN_IN,
      component: createLazy(() => import("@/pages/public/sign-in.page"), "SignInPage"),
    },
    {
      path: ROUTES.SIGN_UP,
      component: createLazy(() => import("@/pages/public/sign-up.page"), "SignUpPage"),
    },
    {
      path: ROUTES.FORGOT_PASSWORD,
      component: createLazy(
        () => import("@/pages/public/forgot-password.page"),
        "ForgotPasswordPage"
      ),
    },
    {
      path: ROUTES.RESET_PASSWORD,
      component: createLazy(
        () => import("@/pages/public/reset-password.page"),
        "ResetPasswordPage"
      ),
    },
  ],

  protected: [
    {
      path: ROUTES.DASHBOARD,
      component: createLazy(() => import("@/pages/dashboard/dashboard.page"), "DashboardPage"),
    },
  ],
};
