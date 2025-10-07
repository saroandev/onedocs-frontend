import { ErrorBoundary } from "@/shared/ui";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};
