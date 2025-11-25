/**
 * AnimatedCard Component
 * Card component with fade in and scale animations
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { colors, spacing, shadows } from '../../theme';
import { useFadeAnimation } from '../../hooks/useFadeAnimation';
import { useScaleAnimation } from '../../hooks/useScaleAnimation';
import { ANIMATION_DURATION } from '../../utils/constants';

interface AnimatedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  delay?: number;
  animationType?: 'fade' | 'scale' | 'both';
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  style,
  elevated = true,
  delay = 0,
  animationType = 'both',
}) => {
  const { fadeAnim } = useFadeAnimation({
    duration: ANIMATION_DURATION.normal,
    delay,
    autoStart: animationType === 'fade' || animationType === 'both',
  });

  const { scaleAnim } = useScaleAnimation({
    duration: ANIMATION_DURATION.normal,
    delay,
    initialScale: 0.95,
    autoStart: animationType === 'scale' || animationType === 'both',
  });

  const animatedStyle: any = {};

  if (animationType === 'fade' || animationType === 'both') {
    animatedStyle.opacity = fadeAnim;
  }

  if (animationType === 'scale' || animationType === 'both') {
    animatedStyle.transform = [{ scale: scaleAnim }];
  }

  return (
    <Animated.View
      style={[
        styles.card,
        elevated && shadows.medium,
        animatedStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.base,
    marginBottom: spacing.base,
  },
});

