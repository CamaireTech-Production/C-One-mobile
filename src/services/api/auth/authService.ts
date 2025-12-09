import apiClient from '../apiClient';
import { ENDPOINTS } from '../endpoints';
import { jsonHeaders } from '../headers';
import type {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyOtpRequest,
  AuthUser,
  RefreshResponse,
} from '../types';
import { saveTokens, clearTokens } from '../../auth/tokenStorage';

export const authService = {
  /**
   * Register a new user
   * Returns success message (no tokens - email must be verified first)
   */
  register: async (payload: RegisterRequest) => {
    const response = await apiClient.post(
      ENDPOINTS.auth.register,
      payload,
      { headers: jsonHeaders() },
    );
    return response.data as { message: string };
  },

  /**
   * Verify email with OTP code
   * Returns authUser with tokens - automatically saves tokens
   */
  verifyEmail: async (payload: VerifyEmailRequest) => {
    const response = await apiClient.post(
      ENDPOINTS.auth.verifyEmail,
      payload,
      { headers: jsonHeaders() },
    );
    const data = response.data as VerifyEmailResponse;

    // Save tokens if provided (after successful verification)
    if (data.data?.authUser?.tokens) {
      await saveTokens(data.data.authUser.tokens);
    }

    return data;
  },

  /**
   * Login with email and password
   * Returns authUser with tokens - automatically saves tokens
   */
  login: async (payload: LoginRequest) => {
    const response = await apiClient.post(
      ENDPOINTS.auth.login,
      payload,
      { headers: jsonHeaders() },
    );
    // Backend returns: { message, data: { authUser } }
    const responseData = response.data as { message: string; data: { authUser: AuthUser } };
    const authUser = responseData.data.authUser;

    // Save tokens automatically
    if (authUser?.tokens) {
      await saveTokens(authUser.tokens);
    }

    // Return in the format expected by AuthContext
    return { message: responseData.message, authUser };
  },

  /**
   * Request password reset OTP
   * Sends OTP to email
   */
  forgotPassword: async (payload: ForgotPasswordRequest) => {
    const response = await apiClient.post(
      ENDPOINTS.auth.forgotPassword,
      payload,
      { headers: jsonHeaders() },
    );
    return response.data as { message: string };
  },

  /**
   * Verify OTP for password reset
   * Validates the OTP before allowing password reset
   */
  verifyOtp: async (payload: VerifyOtpRequest) => {
    const response = await apiClient.post(
      ENDPOINTS.auth.verifyOtp,
      payload,
      { headers: jsonHeaders() },
    );
    return response.data as { message: string };
  },

  /**
   * Reset password with OTP
   * Requires email, otp, password, and password_confirmation
   */
  resetPassword: async (payload: ResetPasswordRequest) => {
    const response = await apiClient.post(
      ENDPOINTS.auth.resetPassword,
      payload,
      { headers: jsonHeaders() },
    );
    return response.data as { message: string };
  },

  /**
   * Refresh access token using refresh token
   * Automatically saves new tokens
   */
  refreshToken: async () => {
    const response = await apiClient.post(
      ENDPOINTS.auth.refresh,
      {},
      { headers: jsonHeaders() },
    );
    const data = response.data as RefreshResponse;

    // Save new tokens
    if (data.tokens) {
      await saveTokens(data.tokens);
    }

    return data;
  },

  /**
   * Get current authenticated user profile
   * Backend returns: { data: { email, name, avatar } }
   */
  me: async () => {
    const response = await apiClient.get(ENDPOINTS.auth.me);
    // Backend returns: { data: { email, name, avatar } }
    const userData = response.data?.data;
    
    if (!userData || !userData.email) {
      throw new Error('No user data received from /me endpoint');
    }

    // Map backend response to AuthUser type
    // Note: Backend doesn't return id, role, status, so we use defaults
    // These should be added to the backend response in the future
    const authUser: AuthUser = {
      id: userData.id || '', // Backend doesn't return this - should be added
      email: userData.email,
      name: userData.name,
      role: userData.role || 'CUSTOMER', // Default - backend should return this
      status: userData.status || 'ACTIVE', // Default - backend should return this
      // tokens are not returned by /me endpoint
    };

    return authUser;
  },

  /**
   * Logout - clears tokens from storage
   */
  logout: async () => {
    try {
      const response = await apiClient.post(
        ENDPOINTS.auth.logout,
        {},
        { headers: jsonHeaders() },
      );
      // Clear tokens regardless of API response
      await clearTokens();
      return response.data as { message: string };
    } catch (error) {
      // Clear tokens even if API call fails
      await clearTokens();
      throw error;
    }
  },
};

