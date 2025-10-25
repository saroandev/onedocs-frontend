/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { showNotification } from "@/shared/lib/notification";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

const queryCache = new QueryCache({
  onError: (error: any) => {
    const errorMessage =
      error?.response?.data?.detail[0]?.msg || error?.response?.data?.detail || "Bir hata oluştu";
    showNotification("error", errorMessage);
  },
});

const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    // Global ayarlar
    queries: {
      staleTime: 1000 * 60 * 5, // 5 dakika cache
      gcTime: 1000 * 60 * 30, // 30 dakika (eski adı cacheTime)
      refetchOnWindowFocus: false, // Pencere focus'ta yenileme
      retry: false, // Hata durumunda 1 kez retry
    },
    mutations: {
      retry: false,
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer theme="colored" />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
