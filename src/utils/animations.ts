/**
 * Animation Utilities
 * Helper functions and constants for animations
 */

import { Animated, Easing } from 'react-native';
import { ANIMATION_DURATION } from './constants';

/**
 * Create a fade in animation
 */
export const createFadeIn = (duration: number = ANIMATION_DURATION.normal) => {
  return Animated.timing(new Animated.Value(0), {
    toValue: 1,
    duration,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  });
};

/**
 * Create a fade out animation
 */
export const createFadeOut = (duration: number = ANIMATION_DURATION.normal) => {
  return Animated.timing(new Animated.Value(1), {
    toValue: 0,
    duration,
    easing: Easing.in(Easing.ease),
    useNativeDriver: true,
  });
};

/**
 * Create a scale animation
 */
export const createScale = (
  from: number = 0.8,
  to: number = 1,
  duration: number = ANIMATION_DURATION.normal
) => {
  return Animated.timing(new Animated.Value(from), {
    toValue: to,
    duration,
    easing: Easing.out(Easing.back(1.2)),
    useNativeDriver: true,
  });
};

/**
 * Create a spring animation
 */
export const createSpring = (
  from: number = 0.8,
  to: number = 1,
  tension: number = 50,
  friction: number = 7
) => {
  return Animated.spring(new Animated.Value(from), {
    toValue: to,
    tension,
    friction,
    useNativeDriver: true,
  });
};

/**
 * Stagger animations for list items
 */
export const staggerAnimations = (
  animations: Animated.CompositeAnimation[],
  delay: number = 50
) => {
  return Animated.stagger(delay, animations);
};

/**
 * Sequence animations
 */
export const sequenceAnimations = (
  animations: Animated.CompositeAnimation[]
) => {
  return Animated.sequence(animations);
};

/**
 * Parallel animations
 */
export const parallelAnimations = (
  animations: Animated.CompositeAnimation[]
) => {
  return Animated.parallel(animations);
};

