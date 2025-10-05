/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { authApi } from "../api/public.api";
import type { ForgotPasswordDto } from "../api/public.types";
import { showNotification } from "@/shared/lib/notification";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const forgotPassword = async (values: ForgotPasswordDto) => {
    try {
      setLoading(true);
      const response = await authApi.forgotPassword(values);
      showNotification("success", response.message);
    } catch (error: any) {
      showNotification("error", `${error?.response?.status} - ${error?.response?.data?.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading };
};
