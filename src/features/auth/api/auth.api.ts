/* eslint-disable @typescript-eslint/no-unused-vars */
import { onedocsAuthApiClient } from "@/shared/lib/api/http-client";
import type {
  SignInDto,
  SignUpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  SignUpResponse,
  RefreshTokenDto,
  RefreshTokenResponse,
} from "./auth.types";

export const authApi = {
  signIn: async (credentials: SignInDto): Promise<SignInResponse> => {
    const response = await onedocsAuthApiClient.post<SignInResponse>("auth/login", credentials);
    return response.data;
  },

  signUp: async (data: SignUpDto): Promise<SignUpResponse> => {
    const response = await onedocsAuthApiClient.post<SignUpResponse>("auth/register", data);
    return response.data;
  },

  signOut: async (): Promise<void> => {
    await onedocsAuthApiClient.post("auth/logout");
  },

  forgotPassword: async (value: ForgotPasswordDto): Promise<ForgotPasswordResponse> => {
    return { message: "test" };
    // const response = await onedocsAuthApiClient.post<ForgotPasswordResponse>("/", email);
    // return response.data;
  },

  resetPassword: async (value: ResetPasswordDto): Promise<ResetPasswordResponse> => {
    return { message: "test" };
    // const response = await onedocsAuthApiClient.post<ResetPasswordResponse>("/", data);
    // return response.data;
  },

  whoAmI: async () => {
    const response = await onedocsAuthApiClient.get("auth/me");
    return response.data;
  },

  refreshToken: async (value: RefreshTokenDto): Promise<RefreshTokenResponse> => {
    const response = await onedocsAuthApiClient.post<RefreshTokenResponse>("auth/refresh", value);
    return response.data;
  },
};
