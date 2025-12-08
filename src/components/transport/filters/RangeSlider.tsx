/**
 * RangeSlider Component
 * Slider component for selecting a range of values (e.g., time, duration, escales)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { SimpleSlider } from './SimpleSlider';

export interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
  formatValue?: (value: number) => string;
  containerStyle?: ViewStyle;
  step?: number;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  min,
  max,
  value,
  onValueChange,
  formatValue,
  containerStyle,
  step = 1,
}) => {
  const displayValue = formatValue ? formatValue(value) : String(value);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{displayValue}</Text>
      </View>
      <SimpleSlider
        min={min}
        max={max}
        value={value}
        onValueChange={onValueChange}
        step={step}
        containerStyle={styles.slider}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
  },
  value: {
    ...typography.styles.bodyBold16,
    color: colors.primary.normal,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

