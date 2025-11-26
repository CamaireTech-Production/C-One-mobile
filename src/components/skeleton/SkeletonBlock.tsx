import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';

import { colors } from '../../theme';

const useSkeletonPulse = () => {
  const animatedValue = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [animatedValue]);

  return animatedValue;
};

interface SkeletonBlockProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  width = '100%',
  height = 120,
  borderRadius = 12,
  style,
}) => {
  const pulse = useSkeletonPulse();
  return (
    <Animated.View
      style={[
        styles.block,
        { width, height, borderRadius, opacity: pulse },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.background.tertiary,
  },
});


