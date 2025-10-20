import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { ENV } from "@/app/config/env";
import { useAuthStore } from "@/features/auth/store/auth.store";

const createApiClient = (options?: { contentType?: string; baseUrl: string }): AxiosInstance => {
  if (!options?.baseUrl) {
    console.warn("cannot find appConfig baseUrl");
  }

  const getAccessToken = () => useAuthStore.getState().token || undefined;

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

      // const currentToken = getAccessToken();  // TODO
      // if (accessToken && accessToken !== currentToken) {
      //   useAuthStore.getState().logout();
      // }

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
          // TODO
          return Promise.reject(error);
        case 404:
          return Promise.reject(error);
        case 500:
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    }
  );

  return apiClient;
};

const onedocsAuthApiClient = createApiClient({
  baseUrl: ENV.AUTH_API!,
});

const onedocsKnowledgeBaseApiClient = createApiClient({
  baseUrl: ENV.KNOWLEDGE_BASE_API!,
});

export const httpClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    onedocsAuthApiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    onedocsAuthApiClient.post<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    onedocsAuthApiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    onedocsAuthApiClient.delete<T>(url, config).then((res) => res.data),
};

export { onedocsAuthApiClient, onedocsKnowledgeBaseApiClient };
