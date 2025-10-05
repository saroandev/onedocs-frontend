import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { showNotification } from "../notification";
import { ENV } from "@/app/config/env";
import { usePublicStore } from "@/features/public/store/public.store";

const createApiClient = (options?: { contentType?: string; baseUrl: string }): AxiosInstance => {
  if (!options?.baseUrl) {
    console.warn("cannot find appConfig baseUrl");
  }

  const getAccessToken = () => usePublicStore.getState().token || undefined;

  const requestHeaders: Record<string, string> = {
    "Content-Type": options?.contentType || "application/json",
  };

  const apiClient = axios.create({
    baseURL: options?.baseUrl,
    headers: requestHeaders,
  });

  apiClient.interceptors.request.use(
    async (config) => {
      const accessToken = getAccessToken();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      const currentToken = getAccessToken();
      if (accessToken && accessToken !== currentToken) {
        usePublicStore.getState().logout();
        window.location.href = "/";
      }

      return config;
    },
    async (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    async (response) => response,
    async (error) => {
      const status = error.response?.status;

      switch (status) {
        case 400:
          return Promise.reject(error);
        case 401:
          usePublicStore.getState().logout();
          window.location.href = "/sign-in";
          return Promise.reject(error);
        case 404:
          showNotification("error", error);
          return Promise.reject(error);
        case 500:
          showNotification("error", error);
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    }
  );

  return apiClient;
};

const onedocsApiClient = createApiClient({
  baseUrl: ENV.API_URL!,
});

export const httpClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    onedocsApiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    onedocsApiClient.post<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    onedocsApiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    onedocsApiClient.delete<T>(url, config).then((res) => res.data),
};

export { onedocsApiClient };
