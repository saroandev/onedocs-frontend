/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/public.api";
import type { ResetPasswordDto } from "../api/public.types";
import { showNotification } from "@/shared/lib/notification";
import { ROUTES } from "@/app/router/routes.config";

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async (values: ResetPasswordDto) => {
    try {
      setLoading(true);
      const response = await authApi.resetPassword(values);
      showNotification("success", response.message);
      window.localStorage.clear();
      navigate(ROUTES.SIGN_IN, { replace: true });
    } catch (error: any) {
      showNotification("error", `${error?.response?.status} - ${error?.response?.data?.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading };
};
