/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { authApi } from "../api/public.api";
import type { SignUpDto } from "../api/public.types";
import { showNotification } from "@/shared/lib/notification";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes.config";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signUp = async (values: SignUpDto) => {
    try {
      setLoading(true);
      await authApi.signUp(values);
      showNotification("success", "Your registration has been successfully created.");
      navigate(ROUTES.SIGN_IN, { replace: true });
    } catch (error: any) {
      showNotification("error", error?.response?.data?.message || error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading };
};
