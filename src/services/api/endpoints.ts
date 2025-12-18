/**
 * Central definition of API endpoints.
 * Keep every path here so we can update versions or prefixes easily.
 */

const API_PREFIX = '/api/v1';

export const ENDPOINTS = {
  auth: {
    register: `${API_PREFIX}/auth/register`,
    verifyEmail: `${API_PREFIX}/auth/verify-email`,
    login: `${API_PREFIX}/auth/login`,
    forgotPassword: `${API_PREFIX}/auth/forgot-password`,
    resetPassword: `${API_PREFIX}/auth/reset-password`,
    verifyOtp: `${API_PREFIX}/auth/verify-otp`,
    refresh: `${API_PREFIX}/auth/refresh`,
    me: `${API_PREFIX}/auth/me`,
    logout: `${API_PREFIX}/auth/logout`,
  },
  catalog: {
    featuredCountries: `${API_PREFIX}/catalog/discovery/featured-countries`,
    nearby: `${API_PREFIX}/catalog/discovery/nearby`,
    autocomplete: `${API_PREFIX}/catalog/locations/autocomplete`,
  },
} as const;

export type EndpointGroup = typeof ENDPOINTS;

