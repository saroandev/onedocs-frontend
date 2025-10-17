import { authRoutes } from "./auth-routes";
import { AuthGuard } from "./guard/auth-guard";
import { publicRoutes } from "./public-routes";
import { PublicGuard } from "./guard/public-guard";
// import { RootLayout } from "../layouts";
import type { AppRoute } from "./types/router.types";

export const routes: AppRoute[] = [
  {
    path: "/",
    element: <AuthGuard />,
    children: authRoutes,
    // errorElement: <RootLayout />, //TODO
  },
  {
    path: "/",
    element: <PublicGuard />,
    children: publicRoutes,
    // errorElement: <RootLayout />,
  },
];
