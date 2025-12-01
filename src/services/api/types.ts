export type ApiValidationErrors = Record<string, string[]>;

export type ApiErrorResponse = {
  message?: string;
  errors?: ApiValidationErrors;
};

export type TokensResponse = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string; // timestamp as string from backend
  tokenType: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  tokens?: TokensResponse;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type VerifyEmailRequest = {
  email: string;
  otp: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
};

export type LoginResponse = {
  message: string;
  authUser: AuthUser;
};

export type VerifyEmailResponse = {
  message: string;
  data: {
    authUser: AuthUser;
  };
};

export type RefreshResponse = {
  message: string;
  tokens: TokensResponse;
};

