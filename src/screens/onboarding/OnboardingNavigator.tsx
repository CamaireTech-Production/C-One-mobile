/**
 * Onboarding Navigator
 * Handles navigation between the 3 onboarding screens
 */

import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3 } from './index';
import { colors } from '../../theme';

interface OnboardingNavigatorProps {
  onComplete: () => void;
  onSignUp?: () => void;
}

export const OnboardingNavigator: React.FC<OnboardingNavigatorProps> = ({
  onComplete,
  onSignUp,
}) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateTransition = (midAction?: () => void, restoreOpacity: boolean = true) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      midAction?.();
      if (restoreOpacity) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  const handleContinue = () => {
    if (currentScreen < 3) {
      animateTransition(() =>
        setCurrentScreen((prev) => Math.min(prev + 1, 3))
      );
    } else {
      animateTransition(() => {
        onComplete();
      }, false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.screenWrapper, { opacity: fadeAnim }]}>
        {currentScreen === 1 && (
          <OnboardingScreen1 onContinue={handleContinue} onSignUp={onSignUp} />
        )}
        {currentScreen === 2 && <OnboardingScreen2 onContinue={handleContinue} />}
        {currentScreen === 3 && <OnboardingScreen3 onContinue={handleContinue} />}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  screenWrapper: {
    flex: 1,
  },
});

