/**
 * Main App Navigator
 * Handles navigation between auth and main app flows
 */

import React, { useState, useEffect } from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { SplashScreen } from '../screens/splash/SplashScreen';
import { OnboardingNavigator } from '../screens/onboarding/OnboardingNavigator';
import { LoginScreen } from '../screens/auth/login/LoginScreen';
import { SignUpScreen } from '../screens/auth/signup/SignUpScreen';
import { ForgotPasswordScreen } from '../screens/auth/forgotPassword/ForgotPasswordScreen';
import { OtpVerificationScreen } from '../screens/auth/otpVerification/OtpVerificationScreen';
import { ResetPasswordScreen } from '../screens/auth/resetPassword/ResetPasswordScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { useAuth } from '../services/auth/authContext';

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated, isInitializing } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [requestedAuthScreen, setRequestedAuthScreen] = useState<'Login' | 'SignUp'>('Login');
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = (nextScreen: 'Login' | 'SignUp' = 'Login') => {
    setRequestedAuthScreen(nextScreen);
    setHasSeenOnboarding(true);
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

  useEffect(() => {
    if (isAuthenticated && isNavigationReady && !isInitializing) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  }, [isAuthenticated, isNavigationReady, isInitializing]);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => setIsNavigationReady(true)}
    >
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
        ) : (
          <>
            {!isAuthenticated ? (
              <>
                <Stack.Screen name="Login">
                  {({ navigation }) => (
                    <LoginScreen
                      onSignUp={() => navigation.navigate('SignUp')}
                      onForgotPassword={() => navigation.navigate('ForgotPassword')}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="SignUp">
                  {({ navigation }) => (
                    <SignUpScreen
                      onLogin={() => navigation.navigate('Login')}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="ForgotPassword">
                  {({ navigation }) => (
                    <ForgotPasswordScreen
                      onBack={() => navigation.navigate('Login')}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="OtpVerification">
                  {({ navigation }) => (
                    <OtpVerificationScreen
                      onBack={() => navigation.navigate('Login')}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="ResetPassword">
                  {({ navigation }) => (
                    <ResetPasswordScreen
                      onBack={() => navigation.navigate('Login')}
                    />
                  )}
                </Stack.Screen>
              </>
            ) : null}
            <Stack.Screen name="Main">
              {() => <MainTabNavigator />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
