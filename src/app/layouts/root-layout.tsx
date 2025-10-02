import { ErrorBoundary } from "@/shared/ui/error-boundary";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};
