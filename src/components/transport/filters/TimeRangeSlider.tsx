/**
 * TimeRangeSlider Component
 * Dual slider for selecting time ranges (departure/arrival times)
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

export interface TimeRangeSliderProps {
  label: string;
  minTime: number; // Minutes from midnight (e.g., 0 = 00:00, 1440 = 24:00)
  maxTime: number;
  startTime: number;
  endTime: number;
  onStartTimeChange: (time: number) => void;
  onEndTimeChange: (time: number) => void;
  containerStyle?: ViewStyle;
}

const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

export const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({
  label,
  minTime,
  maxTime,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      
      <View style={styles.timeDisplayRow}>
        <View style={styles.timeDisplay}>
          <Text style={styles.timeLabel}>De</Text>
          <Text style={styles.timeValue}>{formatTime(startTime)}</Text>
        </View>
        <View style={styles.timeDisplay}>
          <Text style={styles.timeLabel}>À</Text>
          <Text style={styles.timeValue}>{formatTime(endTime)}</Text>
        </View>
      </View>

      <View style={styles.slidersContainer}>
        <SimpleSlider
          min={minTime}
          max={endTime} // Can't go beyond endTime
          value={startTime}
          onValueChange={onStartTimeChange}
          step={30} // 30-minute intervals
          containerStyle={styles.slider}
        />
        <SimpleSlider
          min={startTime} // Can't go below startTime
          max={maxTime}
          value={endTime}
          onValueChange={onEndTimeChange}
          step={30}
          containerStyle={styles.slider}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
    marginBottom: spacing.base,
  },
  timeDisplayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  timeDisplay: {
    alignItems: 'center',
  },
  timeLabel: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  timeValue: {
    ...typography.styles.bodyBold18,
    color: colors.primary.normal,
  },
  slidersContainer: {
    gap: spacing.sm,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

