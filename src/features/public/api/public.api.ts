/* eslint-disable @typescript-eslint/no-unused-vars */
import { onedocsApiClient } from "@/shared/lib/api/http-client";
import type {
  SignInDto,
  SignUpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  SignUpResponse,
} from "./public.types";

export const authApi = {
  signIn: async (credentials: SignInDto): Promise<SignInResponse> => {
    return { message: "test" };
    // const response = await onedocsApiClient.post<SignInResponse>("/", credentials);
    // return response.data;
  },

  signUp: async (data: SignUpDto): Promise<SignUpResponse> => {
    return { message: "test" };
    // const response = await onedocsApiClient.post<SignUpResponse>("/", data);
    // return response.data;
  },

  signOut: async (): Promise<void> => {
    // await onedocsApiClient.post("/");
  },

  forgotPassword: async (email: ForgotPasswordDto): Promise<ForgotPasswordResponse> => {
    return { message: "test" };
    // const response = await onedocsApiClient.post<ForgotPasswordResponse>("/", email);
    // return response.data;
  },

  resetPassword: async (data: ResetPasswordDto): Promise<ResetPasswordResponse> => {
    return { message: "test" };
    // const response = await onedocsApiClient.post<ResetPasswordResponse>("/", data);
    // return response.data;
  },

  whoAmI: async () => {
    // const response = await onedocsApiClient.get("/");
    // return response.data;
  },
};
