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
  //TODO
  signIn: async (credentials: SignInDto): Promise<SignInResponse> => {
    // const response = await onedocsApiClient.post<SignInResponse>("/", credentials);
    // return response.data;
  },

  signUp: async (data: SignUpDto): Promise<SignUpResponse> => {
    // const response = await onedocsApiClient.post<SignUpResponse>("/", data);
    // return response.data;
  },

  signOut: async (): Promise<void> => {
    // await onedocsApiClient.post("/");
  },

  forgotPassword: async (email: ForgotPasswordDto): Promise<ForgotPasswordResponse> => {
    // const response = await onedocsApiClient.post<ForgotPasswordResponse>("/", email);
    // return response.data;
  },

  resetPassword: async (data: ResetPasswordDto): Promise<ResetPasswordResponse> => {
    // const response = await onedocsApiClient.post<ResetPasswordResponse>("/", data);
    // return response.data;
  },

  whoAmI: async () => {
    // const response = await onedocsApiClient.get("/");
    // return response.data;
  },
};
