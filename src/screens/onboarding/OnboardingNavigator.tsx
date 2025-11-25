/**
 * Onboarding Navigator
 * Handles navigation between the 3 onboarding screens
 */

import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Pressable, Dimensions } from 'react-native';
import { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3 } from './index';
import { colors } from '../../theme';

interface OnboardingNavigatorProps {
  onComplete: () => void;
  onSignUp?: () => void;
}

const { height } = Dimensions.get('window');

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

  const handlePrevious = () => {
    if (currentScreen === 1) {
      return;
    }

    animateTransition(() =>
      setCurrentScreen((prev) => Math.max(prev - 1, 1))
    );
  };

  return (
    <View style={styles.container}>
      <View pointerEvents="box-none" style={styles.tapOverlay}>
        <Pressable
          style={styles.tapZone}
          onPress={handlePrevious}
          android_disableSound
        />
        <Pressable
          style={styles.tapZone}
          onPress={handleContinue}
          android_disableSound
        />
      </View>
      <Animated.View style={[styles.screenWrapper, { opacity: fadeAnim }]}>
        {currentScreen === 1 && (
          <OnboardingScreen1 onContinue={handleContinue} onSignUp={onSignUp} />
        )}
        {currentScreen === 2 && (
          <OnboardingScreen2 onContinue={handleContinue} onSignUp={onSignUp} />
        )}
        {currentScreen === 3 && (
          <OnboardingScreen3 onContinue={handleContinue} onSignUp={onSignUp} />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  tapOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  tapZone: {
    flex: 1,
    height: height * 0.65,
  },
  screenWrapper: {
    flex: 1,
    zIndex: 2,
  },
});

