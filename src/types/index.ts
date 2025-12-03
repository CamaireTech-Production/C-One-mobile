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
  // Flight routes
  FlightSearch: {
    countryCode: string;
    cityId?: string;
    context?: 'client-location' | 'other-country';
  };
  FlightResults: {
    countryCode: string;
    cityId?: string;
    context?: 'client-location' | 'other-country';
    origin?: string;
    destination?: string;
    date?: string;
    passengers?: number;
  };
  FlightBooking: {
    offerId: string;
    offer: any; // TransportOffer - will be properly typed
  };
  FlightTicket: {
    ticketId: string;
    ticket: any; // TransportTicket - will be properly typed
  };
  // Train routes
  TrainSearch: {
    countryCode: string;
    cityId?: string;
    context?: 'client-location' | 'other-country';
  };
  TrainResults: {
    countryCode: string;
    cityId?: string;
    context?: 'client-location' | 'other-country';
    origin?: string;
    destination?: string;
    date?: string;
    passengers?: number;
  };
  TrainBooking: {
    offerId: string;
    offer: any; // TransportOffer
  };
  TrainTicket: {
    ticketId: string;
    ticket: any; // TransportTicket
  };
  // Car routes
  CarSearch: {
    countryCode: string;
    cityId?: string;
    context?: 'client-location' | 'other-country';
  };
  CarResults: {
    countryCode: string;
    cityId?: string;
    origin?: string;
    destination?: string;
  };
  // Shared routes
  PersonalInformation: {
    bookingDetails?: any; // BookingDetails
    returnTo?: string; // Screen to return to after completion
  };
  Payment: {
    bookingDetails: any; // BookingDetails
    personalInfo?: any; // Personal information
  };
  BookingConfirmation: {
    bookingId: string;
    type: 'plane' | 'train';
  };
  Password: {
    purpose?: 'payment' | 'verification';
    onSuccess?: () => void;
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
