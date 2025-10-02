import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { RootLayout } from "@/app/layouts/root-layout";
import { AuthLayout } from "@/app/layouts/auth-layout/auth-layout";
import { DashboardLayout } from "@/app/layouts/dashboard-layout/dashboard-layout";
import { AuthGuard } from "./guard/auth-guard";

const SignInPage = lazy(() =>
  import("@/pages/auth/sign-in.page").then((module) => ({
    default: module.SignInPage,
  }))
);
const SignUpPage = lazy(() =>
  import("@/pages/auth/sign-up.page").then((module) => ({
    default: module.SignUpPage,
  }))
);
const ForgotPasswordPage = lazy(() =>
  import("@/pages/auth/forgot-password.page").then((module) => ({
    default: module.ForgotPassword,
  }))
);
const ResetPasswordPage = lazy(() =>
  import("@/pages/auth/reset-password.page").then((module) => ({
    default: module.ResetPasswordPage,
  }))
);

const DashboardPage = lazy(() =>
  import("@/pages/dashboard/dashboard.page").then((module) => ({
    default: module.DashboardPage,
  }))
);

const NotFoundPage = lazy(() =>
  import("@/pages/errors/404.page").then((module) => ({
    default: module.Page404,
  }))
);

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/sign-in"
            element={
              <Suspense fallback={<>loading...</>}>
                <SignInPage />
              </Suspense>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Suspense fallback={<>loading...</>}>
                <SignUpPage />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<>loading...</>}>
                <ForgotPasswordPage />
              </Suspense>
            }
          />
          <Route
            path="/reset-password"
            element={
              <Suspense fallback={<>loading...</>}>
                <ResetPasswordPage />
              </Suspense>
            }
          />
        </Route>

        {/* Protected Routes */}
        <Route element={<AuthGuard />}>
          <Route element={<DashboardLayout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<>loading...</>}>
                  <DashboardPage />
                </Suspense>
              }
            />
          </Route>
        </Route>

        {/* Error Routes */}
        <Route
          path="/404"
          element={
            <Suspense fallback={<>loading...</>}>
              <NotFoundPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};
