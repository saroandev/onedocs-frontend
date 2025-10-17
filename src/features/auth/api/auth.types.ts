export interface SignInDto {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface SignUpDto {
  email: string;
  password: string;
  full_name: string;
  password_confirm: string;
}

export interface SignUpResponse {
  success: boolean;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordDto {
  password: string;
  token: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface RefreshTokenDto {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
