/**
 * Onboarding Navigator
 * Handles navigation between the 3 onboarding screens
 */

import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Pressable, Dimensions, Easing } from 'react-native';
import { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3 } from './index';
import { colors } from '../../theme';

interface OnboardingNavigatorProps {
  onComplete: () => void;
  onSignUp?: () => void;
}

const { height, width } = Dimensions.get('window');

export const OnboardingNavigator: React.FC<OnboardingNavigatorProps> = ({
  onComplete,
  onSignUp,
}) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const translateAnim = useRef(new Animated.Value(0)).current;
  const isAnimatingRef = useRef(false);

  const runSlideTransition = (targetScreen: number, direction: 'forward' | 'backward') => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const exitDistance = direction === 'forward' ? -width * 0.4 : width * 0.4;
    Animated.timing(translateAnim, {
      toValue: exitDistance,
      duration: 320,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      const entryStart = direction === 'forward' ? width : -width;
      translateAnim.setValue(entryStart);
      setCurrentScreen(targetScreen);
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start(() => {
        isAnimatingRef.current = false;
      });
    });
  };

  const handleContinue = () => {
    // Le bouton "Commencer" redirige toujours vers le login
    if (!isAnimatingRef.current) {
      onComplete();
    }
  };

  const handleNext = () => {
    // Navigation par tap droit vers l'écran suivant
    if (currentScreen < 3) {
      runSlideTransition(currentScreen + 1, 'forward');
    } else {
      // Si on est sur le dernier écran, rediriger vers le login
      if (!isAnimatingRef.current) {
        onComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (currentScreen === 1) {
      return;
    }

    runSlideTransition(currentScreen - 1, 'backward');
  };

  return (
    <View style={styles.container}>
      <View style={styles.tapOverlay}>
        <Pressable
          style={styles.tapZone}
          onPress={handlePrevious}
          android_disableSound
        />
        <Pressable
          style={styles.tapZone}
          onPress={handleNext}
          android_disableSound
        />
      </View>
      <Animated.View
        style={[
          styles.screenWrapper,
          {
            transform: [{ translateX: translateAnim }],
          },
        ]}
      >
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 3,
  },
  tapZone: {
    flex: 1,
  },
  screenWrapper: {
    flex: 1,
    zIndex: 1,
  },
});

