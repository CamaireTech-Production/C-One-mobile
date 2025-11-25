/**
 * Main App Navigator
 * Handles navigation between auth and main app flows
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { SplashScreen } from '../screens/splash/SplashScreen';
import { OnboardingNavigator } from '../screens/onboarding/OnboardingNavigator';
import { LoginScreen } from '../screens/auth/login/LoginScreen';
import { SignUpScreen } from '../screens/auth/signup/SignUpScreen';
import { ForgotPasswordScreen } from '../screens/auth/forgotPassword/ForgotPasswordScreen';
import { OtpVerificationScreen } from '../screens/auth/otpVerification/OtpVerificationScreen';
import { ResetPasswordScreen } from '../screens/auth/resetPassword/ResetPasswordScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requestedAuthScreen, setRequestedAuthScreen] = useState<'Login' | 'SignUp'>('Login');

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = (nextScreen: 'Login' | 'SignUp' = 'Login') => {
    setRequestedAuthScreen(nextScreen);
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

  const navigatorKey = showSplash
    ? 'splash'
    : !hasSeenOnboarding
      ? 'onboarding'
      : !isAuthenticated
        ? `auth-${requestedAuthScreen}`
        : 'main';

  const initialRouteName = showSplash
    ? 'Splash'
    : !hasSeenOnboarding
      ? 'Onboarding'
      : !isAuthenticated
        ? requestedAuthScreen
        : 'Main';

  return (
    <NavigationContainer>
      <Stack.Navigator
        key={navigatorKey}
        screenOptions={{
          headerShown: false,
          animation: 'fade', // Smooth fade transition
          animationDuration: 300, // Animation duration
        }}
        initialRouteName={initialRouteName}
      >
        {showSplash ? (
          <Stack.Screen name="Splash">
            {() => <SplashScreen onFinish={handleSplashFinish} />}
          </Stack.Screen>
        ) : !hasSeenOnboarding ? (
          <Stack.Screen name="Onboarding">
            {() => (
              <OnboardingNavigator
                onComplete={() => handleOnboardingComplete('Login')}
                onSignUp={() => handleOnboardingComplete('SignUp')}
              />
            )}
          </Stack.Screen>
        ) : !isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {({ navigation }) => (
                <LoginScreen
                  onLogin={handleLogin}
                  onSignUp={() => navigation.navigate('SignUp')}
                  onForgotPassword={() => navigation.navigate('ForgotPassword')}
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
            <Stack.Screen name="ForgotPassword">
              {({ navigation }) => (
                <ForgotPasswordScreen
                  onComplete={() => {
                    // Navigate to OTP verification screen after email is sent
                    navigation.navigate('OtpVerification');
                  }}
                  onBack={() => navigation.navigate('Login')}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="OtpVerification">
              {({ navigation }) => (
                <OtpVerificationScreen
                  onComplete={(code) => {
                    // Navigate to reset password screen after OTP verification
                    navigation.navigate('ResetPassword');
                  }}
                  onBack={() => navigation.navigate('ForgotPassword')}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="ResetPassword">
              {({ navigation }) => (
                <ResetPasswordScreen
                  onComplete={() => {
                    // TODO: Show success modal and navigate to login
                    navigation.navigate('Login');
                  }}
                  onBack={() => navigation.navigate('OtpVerification')}
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
