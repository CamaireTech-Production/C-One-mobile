/**
 * Global TypeScript Types
 */

// Auth Types
export interface User {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Main: undefined;
};

