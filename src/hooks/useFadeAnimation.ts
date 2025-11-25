/**
 * useFadeAnimation Hook
 * Reusable hook for fade in/out animations
 */

import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { ANIMATION_DURATION } from '../utils/constants';

interface UseFadeAnimationOptions {
  duration?: number;
  delay?: number;
  initialValue?: number;
  autoStart?: boolean;
}

export const useFadeAnimation = (options: UseFadeAnimationOptions = {}) => {
  const {
    duration = ANIMATION_DURATION.normal,
    delay = 0,
    initialValue = 0,
    autoStart = true,
  } = options;

  const fadeAnim = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    if (autoStart) {
      const animation = Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      });

      animation.start();

      return () => {
        animation.stop();
      };
    }
    // fadeAnim is a ref, so it doesn't need to be in dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, duration, delay]);

  const fadeIn = (callback?: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start(callback);
  };

  const fadeOut = (callback?: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      delay,
      useNativeDriver: true,
    }).start(callback);
  };

  return {
    fadeAnim,
    fadeIn,
    fadeOut,
  };
};

