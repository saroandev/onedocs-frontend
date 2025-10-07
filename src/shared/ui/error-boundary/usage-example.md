// Example 1: Basic usage in root layout
// src/app/layouts/root-layout.tsx

```typescript
import { ErrorBoundary } from "@/shared/ui/error-boundary";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};
```

// Example 2: Custom fallback UI
// src/app/layouts/dashboard-layout.tsx

```typescript
import { ErrorBoundary } from "@/shared/ui/error-boundary";

const CustomErrorFallback = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h2>Dashboard Error</h2>
    <p>Something went wrong in the dashboard.</p>
    <button onClick={() => window.location.reload()}>Reload</button>
  </div>
);

export const AuthLayout = () => {
  return <ErrorBoundary fallback={<CustomErrorFallback />}>{/_ Layout content _/}</ErrorBoundary>;
};
```

// Example 3: With custom error handler
// src/app/app.tsx

```typescript
import { ErrorBoundary } from "@/shared/ui/error-boundary";
import { logErrorToService } from "@/shared/lib/logging";

export const App = () => {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // Send to error tracking service (Sentry, etc.)
    logErrorToService({
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });
  };

  return (
    <ErrorBoundary onError={handleError}>
      <AppRouter />
    </ErrorBoundary>
  );
};
```

// Example 4: Multiple error boundaries
// src/widgets/dashboard-stats/dashboard-stats.tsx

```typescript
import { ErrorBoundary } from "@/shared/ui/error-boundary";

export const DashboardStats = () => {
  return (
    <ErrorBoundary
      fallback={
        <div className="widget-error">
          <p>Failed to load dashboard stats</p>
        </div>
      }
    >
      {/_ Stats content _/}
    </ErrorBoundary>
  );
};
```
