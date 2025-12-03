/**
 * PassengerCounter Component
 * Stepper component with +/- buttons for passenger count
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

interface PassengerCounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  containerStyle?: ViewStyle;
}

export const PassengerCounter: React.FC<PassengerCounterProps> = ({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
  containerStyle,
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={[styles.button, value <= min && styles.buttonDisabled]}
          onPress={handleDecrement}
          disabled={value <= min}
          activeOpacity={0.7}
        >
          <Icon
            name="remove"
            size={20}
            color={value <= min ? colors.text.tertiary : colors.text.primary}
            family="ionicons"
          />
        </TouchableOpacity>

        <View style={styles.valueContainer}>
          <Text style={styles.value}>{String(value).padStart(2, '0')}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, value >= max && styles.buttonDisabled]}
          onPress={handleIncrement}
          disabled={value >= max}
          activeOpacity={0.7}
        >
          <Icon
            name="add"
            size={20}
            color={value >= max ? colors.text.tertiary : colors.text.primary}
            family="ionicons"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  label: {
    ...typography.styles.inputLabel,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.border.normal,
    borderRadius: 8,
    minHeight: 48,
    paddingHorizontal: spacing.base,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.background.tertiary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.base,
  },
  value: {
    ...typography.styles.bodyMedium18,
    color: colors.text.primary,
  },
});

