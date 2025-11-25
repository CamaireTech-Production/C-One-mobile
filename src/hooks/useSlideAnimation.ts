/**
 * useSlideAnimation Hook
 * Reusable hook for slide animations (from bottom, top, left, right)
 */

import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { ANIMATION_DURATION } from '../utils/constants';

type SlideDirection = 'top' | 'bottom' | 'left' | 'right';

interface UseSlideAnimationOptions {
  direction?: SlideDirection;
  duration?: number;
  delay?: number;
  distance?: number;
  autoStart?: boolean;
}

export const useSlideAnimation = (options: UseSlideAnimationOptions = {}) => {
  const {
    direction = 'bottom',
    duration = ANIMATION_DURATION.normal,
    delay = 0,
    distance = 50,
    autoStart = true,
  } = options;

  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (autoStart) {
      // Set initial position based on direction
      if (direction === 'top') {
        translateY.setValue(-distance);
      } else if (direction === 'bottom') {
        translateY.setValue(distance);
      } else if (direction === 'left') {
        translateX.setValue(-distance);
      } else if (direction === 'right') {
        translateX.setValue(distance);
      }

      // Animate to final position
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          delay,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [autoStart, duration, delay, translateX, translateY, direction, distance]);

  const slideIn = (callback?: () => void) => {
    // Reset to initial position
    if (direction === 'top') {
      translateY.setValue(-distance);
    } else if (direction === 'bottom') {
      translateY.setValue(distance);
    } else if (direction === 'left') {
      translateX.setValue(-distance);
    } else if (direction === 'right') {
      translateX.setValue(distance);
    }

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  const slideOut = (callback?: () => void) => {
    const finalX = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
    const finalY = direction === 'top' ? -distance : direction === 'bottom' ? distance : 0;

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: finalX,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: finalY,
        duration,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  return {
    translateX,
    translateY,
    slideIn,
    slideOut,
  };
};

