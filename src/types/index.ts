/**
 * TypeScript Types
 * Central export for all types
 */

import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OtpVerification: undefined;
  ResetPassword: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Awards: undefined;
  Bookings: undefined;
  Profile: undefined;
};
