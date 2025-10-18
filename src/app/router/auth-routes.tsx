import { Error404Page } from "@/pages/errors/404.page";
import { ROUTES } from "./config/routes.config";
import { PageLoader } from "./page-loader";
import type { AppRoute } from "./types/router.types";

export const authRoutes: AppRoute[] = [
  {
    path: ROUTES.DASHBOARD,
    index: true,
    element: (
      <PageLoader
        key="DashboardPage"
        moduleName="DashboardPage"
        modulePath="dashboard/dashboard.page.tsx"
      />
    ),
  },
  {
    path: ROUTES.CHAT,
    element: <PageLoader key="ChatPage" moduleName="ChatPage" modulePath="chat/chat.page.tsx" />,
  },

  {
    path: "*",
    element: <Error404Page />,
  },
];
