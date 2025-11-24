/**
 * Main App Navigator
 * Handles navigation between auth and main app flows
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { OnboardingNavigator } from '../screens/onboarding/OnboardingNavigator';
import { LoginScreen } from '../screens/auth/login/LoginScreen';
import { SignUpScreen } from '../screens/auth/signup/SignUpScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
  };

  const handleLogin = (email: string, password: string) => {
    // TODO: Implement actual login logic
    console.log('Login:', email, password);
    setIsAuthenticated(true);
  };

  const handleSignUp = (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    // TODO: Implement actual signup logic
    console.log('SignUp:', data);
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade', // Fade in/out animation
        }}
      >
        {!hasSeenOnboarding ? (
          <Stack.Screen name="Onboarding">
            {() => <OnboardingNavigator onComplete={handleOnboardingComplete} />}
          </Stack.Screen>
        ) : !isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {({ navigation }) => (
                <LoginScreen
                  onLogin={handleLogin}
                  onSignUp={() => navigation.navigate('SignUp')}
                  onForgotPassword={() => {
                    // TODO: Navigate to ForgotPassword
                  }}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {({ navigation }) => (
                <SignUpScreen
                  onSignUp={handleSignUp}
                  onLogin={() => navigation.navigate('Login')}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          // TODO: Add Main navigator when authenticated
          <Stack.Screen name="Main">
            {() => null}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

