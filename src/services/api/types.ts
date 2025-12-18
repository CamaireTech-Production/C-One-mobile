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

// ============================================================================
// Catalog API Types
// ============================================================================

/**
 * Featured Country - Used in "others" tab on home screen
 */
export type FeaturedCountry = {
  id: number;
  name: string;
  iso_code: string;
  image: string;
  locations_count: number;
};

export type FeaturedCountriesResponse = {
  data: FeaturedCountry[];
  metadata: any[];
};

/**
 * Nearby Location - Used in "position" tab on home screen
 */
export type NearbyLocation = {
  id: number;
  name: string;
  iata_code?: string;
  country_name: string;
  image: string;
  distance_km: number;
  distance_label: string;
  starting_price?: string;
};

export type NearbyLocationsResponse = {
  data: NearbyLocation[];
  metadata: any[];
};

/**
 * Location Suggestion - Used for autocomplete/search
 */
export type LocationSuggestion = {
  id: number;
  iata: string;
  name: string;
  subtext: string;
  type: string;
  score: number;
};

export type AutocompleteResponse = {
  data: LocationSuggestion[];
  metadata: any[];
};

