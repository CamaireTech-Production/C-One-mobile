/**
 * AnimatedView Component
 * Generic animated view with fade in animation
 */

import React from 'react';
import { Animated, ViewStyle } from 'react-native';
import { useFadeAnimation } from '../../../hooks/useFadeAnimation';
import { ANIMATION_DURATION } from '../../../utils/constants';

interface AnimatedViewProps {
  children: React.ReactNode;
  style?: ViewStyle | Animated.AnimatedProps<ViewStyle>;
  delay?: number;
  duration?: number;
  autoStart?: boolean;
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  style,
  delay = 0,
  duration = ANIMATION_DURATION.normal,
  autoStart = true,
}) => {
  const { fadeAnim } = useFadeAnimation({
    duration,
    delay,
    autoStart,
  });

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

