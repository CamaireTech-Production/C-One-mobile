/**
 * Services - Central Export
 * Export all API services from here
 */

export {
  reverseGeocode,
  getCountryCode,
  getCityName,
  isInCountry,
} from './geolocationService';
export type {
  ReverseGeocodeResult,
  Coordinates,
} from './geolocationService';

export {
  saveLocationCache,
  getLocationCache,
  hasValidCache,
  clearLocationCache,
  getCacheAge,
  getCacheTimeRemaining,
} from './geolocationCache';

// API Services
export { authService } from './api/auth/authService';
export { default as apiClient, extractApiError } from './api/apiClient';
export { ENDPOINTS } from './api/endpoints';
export { jsonHeaders, multipartHeaders, buildHeaders } from './api/headers';
export type {
  ApiErrorResponse,
  ApiValidationErrors,
  AuthUser,
  TokensResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
  RefreshResponse,
} from './api/types';

// Auth Services
export {
  saveTokens,
  getAccessToken,
  getRefreshToken,
  getAccessTokenExpiry,
  isAccessTokenExpired,
  clearTokens,
} from './auth/tokenStorage';
export { AuthProvider, useAuth } from './auth/authContext';
export type { PersistedTokens } from './auth/tokenStorage';

