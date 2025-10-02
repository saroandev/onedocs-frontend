/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInDto } from "../api/auth.types";
import { authApi } from "../api/auth.api";
import { showNotification } from "@/shared/lib/notification";
import { ROUTES } from "@/app/router/routes.config";

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (values: SignInDto) => {
    try {
      setLoading(true);
      const response = await authApi.signIn(values);
      window.localStorage.setItem("accessToken", response.token); //TODO
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error: any) {
      showNotification("error", error?.response?.data?.message || error?.message);
      throw error; //TODO
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
};
