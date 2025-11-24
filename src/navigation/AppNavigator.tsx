/**
 * Main App Navigator
 * Handles navigation between auth and main app flows
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  // TODO: Add auth state check
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade', // Fade in/out animation
        }}
      >
        {/* Auth Flow - Will be implemented later */}
        {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
        {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

