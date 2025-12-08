/**
 * SimpleSlider Component
 * Custom slider implementation without external dependencies
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { colors, spacing, typography } from '../../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface SimpleSliderProps {
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
  step?: number;
  containerStyle?: ViewStyle;
  trackHeight?: number;
  thumbSize?: number;
}

export const SimpleSlider: React.FC<SimpleSliderProps> = ({
  min,
  max,
  value,
  onValueChange,
  step = 1,
  containerStyle,
  trackHeight = 4,
  thumbSize = 20,
}) => {
  const trackWidth = SCREEN_WIDTH - (spacing.base * 4); // Account for padding
  const range = max - min;
  const percentage = ((value - min) / range) * 100;
  const thumbPosition = (percentage / 100) * trackWidth;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      // Handle touch start
    },
    onPanResponderMove: (evt, gestureState) => {
      const newX = Math.max(0, Math.min(trackWidth, gestureState.moveX - spacing.base * 2));
      const newPercentage = (newX / trackWidth) * 100;
      const newValue = min + (newPercentage / 100) * range;
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      onValueChange(clampedValue);
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.trackContainer}>
        <View style={[styles.track, { height: trackHeight }]}>
          <View
            style={[
              styles.trackFilled,
              { height: trackHeight, width: `${percentage}%` },
            ]}
          />
        </View>
        <View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              left: thumbPosition - thumbSize / 2,
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  trackContainer: {
    position: 'relative',
    height: 20,
    justifyContent: 'center',
  },
  track: {
    width: '100%',
    backgroundColor: colors.border.light,
    borderRadius: 2,
    position: 'relative',
  },
  trackFilled: {
    backgroundColor: colors.primary.normal,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    backgroundColor: colors.primary.normal,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.background.primary,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

