export interface SignInDto {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpDto {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  password: string;
  token: string;
}

export interface SignInResponse {
  message: string;
}

export interface SignUpResponse {
  message: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}
