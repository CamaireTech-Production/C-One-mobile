/**
 * Main App Navigator
 * Handles navigation between auth and main app flows
 */

import React, { useState, useEffect, useRef } from 'react';
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
import { getOnboardingSeen, setOnboardingSeen } from '../services/auth/tokenStorage';

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated, isInitializing } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
  const [requestedAuthScreen, setRequestedAuthScreen] = useState<'Login' | 'SignUp'>('Login');

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = async (nextScreen: 'Login' | 'SignUp' = 'Login') => {
    setRequestedAuthScreen(nextScreen);
    await setOnboardingSeen(true);
    setHasSeenOnboarding(true);
  };

  // Load onboarding status from AsyncStorage on mount
  useEffect(() => {
    const loadOnboardingStatus = async () => {
      try {
        const seen = await getOnboardingSeen();
        setHasSeenOnboarding(seen);
      } catch (error) {
        console.error('Error loading onboarding status:', error);
      } finally {
        setIsCheckingOnboarding(false);
      }
    };
    loadOnboardingStatus();
  }, []);

  // Wait for both auth and onboarding checks to complete
  const isReady = !isInitializing && !isCheckingOnboarding;

  const navigatorKey = showSplash
    ? 'splash'
    : !isReady
      ? 'loading'
      : isAuthenticated
        ? 'main' // If authenticated, go directly to main
        : !hasSeenOnboarding
          ? 'onboarding'
          : `auth-${requestedAuthScreen}`;

  const initialRouteName = showSplash
    ? 'Splash'
    : !isReady
      ? 'Splash' // Still showing splash while checking
      : isAuthenticated
        ? 'Main' // If authenticated, go directly to main
        : !hasSeenOnboarding
          ? 'Onboarding'
          : requestedAuthScreen;

  // Track previous auth state to detect logout
  const prevAuthenticatedRef = useRef(isAuthenticated);

  // Handle logout - redirect to Login
  useEffect(() => {
    const wasAuthenticated = prevAuthenticatedRef.current;
    const isNowUnauthenticated = !isAuthenticated;
    
    prevAuthenticatedRef.current = isAuthenticated;
    
    // Detect logout: was authenticated, now not
    if (wasAuthenticated && isNowUnauthenticated && isReady && !showSplash) {
      // Wait for Stack to be recreated, then navigate
      const timer = setTimeout(() => {
        if (navigationRef.isReady()) {
          navigationRef.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isReady, showSplash]);

  return (
    <NavigationContainer ref={navigationRef}>
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
        ) : !isReady ? (
          // Still checking auth/onboarding status - show splash
          <Stack.Screen name="Splash">
            {() => <SplashScreen onFinish={handleSplashFinish} />}
          </Stack.Screen>
        ) : isAuthenticated ? (
          // User is authenticated - go directly to main app
          <Stack.Screen name="Main">
            {() => <MainTabNavigator />}
          </Stack.Screen>
        ) : !hasSeenOnboarding ? (
          // User not authenticated and hasn't seen onboarding
          <Stack.Screen name="Onboarding">
            {() => (
              <OnboardingNavigator
                onComplete={() => handleOnboardingComplete('Login')}
                onSignUp={() => handleOnboardingComplete('SignUp')}
              />
            )}
          </Stack.Screen>
        ) : (
          // User not authenticated but has seen onboarding - show auth screens
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
            <Stack.Screen name="Main">
              {() => <MainTabNavigator />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
