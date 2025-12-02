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
    type: 'country' | 'city';
    countryCode: string; // ISO 3166-1 alpha-2 country code (e.g., 'CM', 'FR')
    cityId?: string; // Only present when type is 'city'
  };
  // Transport routes
  TransportList: {
    countryId: string;
    countryName: string;
    cityId?: string;
    cityName?: string;
  };
  TransportDetail: {
    transportId: string;
    type: 'plane' | 'train' | 'car';
    title: string;
  };
  // Hotel routes
  HotelList: {
    countryId: string;
    countryName: string;
    cityId?: string;
    cityName?: string;
  };
  HotelDetail: {
    hotelId: string;
    title: string;
  };
  // Tourism routes
  TourismList: {
    countryId: string;
    countryName: string;
    cityId?: string;
    cityName?: string;
    categoryId?: string; // Optional filter by category
  };
  TourismDetail: {
    placeId: string;
    title: string;
  };
  // Restaurant routes
  RestaurantList: {
    countryId: string;
    countryName: string;
    cityId?: string;
    cityName?: string;
    categoryId?: string; // Optional filter by category
  };
  RestaurantDetail: {
    restaurantId: string;
    title: string;
  };
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList> | undefined;
  Search: undefined;
  Awards: undefined;
  Bookings: undefined;
  Profile: undefined;
};
