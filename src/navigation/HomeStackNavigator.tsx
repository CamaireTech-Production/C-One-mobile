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

