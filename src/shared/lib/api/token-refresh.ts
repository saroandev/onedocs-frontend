/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { ENV } from "@/app/config/env";

interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}

class TokenRefreshService {
  private isRefreshing = false;
  private failedQueue: QueueItem[] = [];

  private processQueue(error: unknown = null): void {
    this.failedQueue.forEach((item) => {
      if (error) {
        item.reject(error);
      } else {
        item.resolve();
      }
    });

    this.failedQueue = [];
  }

  private addToQueue(item: QueueItem): void {
    this.failedQueue.push(item);
  }

  public getIsRefreshing(): boolean {
    return this.isRefreshing;
  }

  public async handleRefresh(originalRequest: InternalAxiosRequestConfig): Promise<any> {
    const { token, refreshToken, logout, setTokens } = useAuthStore.getState();

    // Kullanıcı authenticate değilse
    if (!token) {
      return Promise.reject(new Error("User not authenticated"));
    }

    // Refresh token isteği için tekrar deneme yapma
    if (originalRequest.url?.includes("/refresh")) {
      logout();
      return Promise.reject(new Error("Refresh token expired"));
    }

    // Zaten refresh işlemi devam ediyorsa, kuyruğa ekle
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.addToQueue({
          resolve,
          reject,
          config: originalRequest,
        });
      });
    }

    this.isRefreshing = true;

    if (!refreshToken) {
      logout();
      return Promise.reject(new Error("No refresh token available"));
    }

    try {
      // Refresh token isteğini at
      const response = await axios.post(`${ENV.AUTH_API}/refresh`, {
        refreshToken: refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // Store'u güncelle
      setTokens(accessToken, newRefreshToken);

      // Kuyruktaki istekleri işle
      this.processQueue();

      return Promise.resolve();
    } catch (error) {
      // Refresh başarısız olduysa
      this.processQueue(error);
      logout();
      return Promise.reject(error);
    } finally {
      this.isRefreshing = false;
    }
  }
}

export const tokenRefreshService = new TokenRefreshService();
