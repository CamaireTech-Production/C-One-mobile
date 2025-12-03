/**
 * Home Stack Navigator
 * Handles navigation within the Home tab (HomeScreen, DetailScreen, and category screens)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/home/HomeScreen';
import { DetailScreen } from '../screens/countryDetail';
import { TransportListScreen, TransportDetailScreen } from '../screens/transport';
import { HotelListScreen, HotelDetailScreen } from '../screens/hotel';
import { TourismListScreen, TourismDetailScreen } from '../screens/tourism';
import { RestaurantListScreen, RestaurantDetailScreen } from '../screens/restaurant';
// Flight screens
import {
  FlightSearchScreen,
  FlightResultsScreen,
  FlightBookingScreen,
  FlightTicketScreen,
} from '../screens/transport/flight';
// Train screens
import {
  TrainSearchScreen,
  TrainResultsScreen,
  TrainBookingScreen,
  TrainTicketScreen,
} from '../screens/transport/train';
// Car screens
import {
  CarSearchScreen,
  CarResultsScreen,
} from '../screens/transport/car';
// Shared screens
import {
  PersonalInformationScreen,
  PaymentScreen,
  BookingConfirmationScreen,
  PasswordScreen,
} from '../screens/shared';
import type { HomeStackParamList } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      
      {/* Transport routes */}
      <Stack.Screen name="TransportList" component={TransportListScreen} />
      <Stack.Screen name="TransportDetail" component={TransportDetailScreen} />
      
      {/* Flight routes */}
      <Stack.Screen name="FlightSearch" component={FlightSearchScreen} />
      <Stack.Screen name="FlightResults" component={FlightResultsScreen} />
      <Stack.Screen name="FlightBooking" component={FlightBookingScreen} />
      <Stack.Screen name="FlightTicket" component={FlightTicketScreen} />
      
      {/* Train routes */}
      <Stack.Screen name="TrainSearch" component={TrainSearchScreen} />
      <Stack.Screen name="TrainResults" component={TrainResultsScreen} />
      <Stack.Screen name="TrainBooking" component={TrainBookingScreen} />
      <Stack.Screen name="TrainTicket" component={TrainTicketScreen} />
      
      {/* Car routes */}
      <Stack.Screen name="CarSearch" component={CarSearchScreen} />
      <Stack.Screen name="CarResults" component={CarResultsScreen} />
      
      {/* Shared routes */}
      <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      
      {/* Hotel routes */}
      <Stack.Screen name="HotelList" component={HotelListScreen} />
      <Stack.Screen name="HotelDetail" component={HotelDetailScreen} />
      
      {/* Tourism routes */}
      <Stack.Screen name="TourismList" component={TourismListScreen} />
      <Stack.Screen name="TourismDetail" component={TourismDetailScreen} />
      
      {/* Restaurant routes */}
      <Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
    </Stack.Navigator>
  );
};

