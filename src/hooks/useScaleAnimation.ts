/**
 * useScaleAnimation Hook
 * Reusable hook for scale animations
 */

import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { ANIMATION_DURATION } from '../utils/constants';

interface UseScaleAnimationOptions {
  duration?: number;
  delay?: number;
  initialScale?: number;
  finalScale?: number;
  autoStart?: boolean;
  useSpring?: boolean;
}

export const useScaleAnimation = (options: UseScaleAnimationOptions = {}) => {
  const {
    duration = ANIMATION_DURATION.normal,
    delay = 0,
    initialScale = 0.8,
    finalScale = 1,
    autoStart = true,
    useSpring = false,
  } = options;

  const scaleAnim = useRef(new Animated.Value(initialScale)).current;

  useEffect(() => {
    if (autoStart) {
      const animation = useSpring
        ? Animated.spring(scaleAnim, {
            toValue: finalScale,
            tension: 50,
            friction: 7,
            delay,
            useNativeDriver: true,
          })
        : Animated.timing(scaleAnim, {
            toValue: finalScale,
            duration,
            delay,
            useNativeDriver: true,
          });

      animation.start();

      return () => {
        animation.stop();
      };
    }
  }, [autoStart, duration, delay, scaleAnim, finalScale, useSpring]);

  const scaleIn = (callback?: () => void) => {
    const animation = useSpring
      ? Animated.spring(scaleAnim, {
          toValue: finalScale,
          tension: 50,
          friction: 7,
          delay,
          useNativeDriver: true,
        })
      : Animated.timing(scaleAnim, {
          toValue: finalScale,
          duration,
          delay,
          useNativeDriver: true,
        });

    animation.start(callback);
  };

  const scaleOut = (callback?: () => void) => {
    Animated.timing(scaleAnim, {
      toValue: initialScale,
      duration,
      delay,
      useNativeDriver: true,
    }).start(callback);
  };

  return {
    scaleAnim,
    scaleIn,
    scaleOut,
  };
};

