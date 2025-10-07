import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import styles from "./error-boundary.module.scss";
import { IconMaintenance } from "../icons";

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    this.props.onError?.(error, errorInfo);

    this.setState({
      errorInfo,
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (!hasError) return children;

    if (fallback) return fallback;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <IconMaintenance />
          </div>

          <h1 className={styles.title}>Oops! Something went wrong</h1>
          <p className={styles.description}>
            We're sorry for the inconvenience. An unexpected error has occurred.
          </p>

          {error && (
            <div className={styles.errorDetails}>
              <details className={styles.details}>
                <summary className={styles.summary}>Error Details</summary>
                <div className={styles.errorContent}>
                  <p className={styles.errorMessage}>
                    <strong>Error:</strong> {error.toString()}
                  </p>
                  {errorInfo && <pre className={styles.stackTrace}>{errorInfo.componentStack}</pre>}
                </div>
              </details>
            </div>
          )}

          <div className={styles.actions}>
            <button onClick={this.handleReset} className={styles.buttonSecondary}>
              Try Again
            </button>
            <button onClick={this.handleReload} className={styles.buttonPrimary}>
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}
