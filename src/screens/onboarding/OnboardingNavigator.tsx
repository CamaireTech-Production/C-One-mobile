/**
 * Onboarding Navigator
 * Handles navigation between the 3 onboarding screens
 * Navigation via swipe gestures (left/right)
 */

import React, { useState, useRef, useMemo } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing, PanResponder } from 'react-native';
import { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3 } from './index';
import { colors } from '../../theme';

interface OnboardingNavigatorProps {
  onComplete: () => void;
  onSignUp?: () => void;
}

const { height, width } = Dimensions.get('window');
const SWIPE_THRESHOLD = 50; // Minimum distance to trigger swipe

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
    // Navigation vers l'écran suivant
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

  // PanResponder pour détecter les swipes
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !isAnimatingRef.current,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          // Détecter uniquement les mouvements horizontaux significatifs
          return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
        },
        onPanResponderRelease: (_, gestureState) => {
          if (isAnimatingRef.current) return;

          const { dx, vx } = gestureState;

          // Swipe de droite vers gauche (dx négatif) → écran suivant
          if (dx < -SWIPE_THRESHOLD || vx < -0.5) {
            if (currentScreen < 3) {
              runSlideTransition(currentScreen + 1, 'forward');
            } else {
              if (!isAnimatingRef.current) {
                onComplete();
              }
            }
          }
          // Swipe de gauche vers droite (dx positif) → écran précédent
          else if (dx > SWIPE_THRESHOLD || vx > 0.5) {
            if (currentScreen > 1) {
              runSlideTransition(currentScreen - 1, 'backward');
            }
          }
        },
      }),
    [currentScreen, onComplete]
  );

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
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
  screenWrapper: {
    flex: 1,
  },
});

