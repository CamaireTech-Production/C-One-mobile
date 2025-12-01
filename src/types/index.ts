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
  OtpVerification: { email: string; type: 'email-verification' | 'password-reset' };
  ResetPassword: { email: string; otp: string };
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Detail: {
    id: string;
    title: string;
    imageUrl?: string;
  };
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList> | undefined;
  Search: undefined;
  Awards: undefined;
  Bookings: undefined;
  Profile: undefined;
};
