/**
 * LocationInputField Component
 * Input field for location selection with icon (location pin, airplane, flag)
 * Supports pre-filling based on context
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Input } from '../../common/forms/Input';
import { Icon } from '../../common/icons/Icon';

export type LocationInputType = 'origin' | 'destination' | 'position';

interface LocationInputFieldProps {
  type: LocationInputType;
  label: string;
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  editable?: boolean;
  containerStyle?: ViewStyle;
  preFilledValue?: string; // Pre-filled value based on context (e.g., geolocation)
  // Custom icon props
  iconName?: string;
  iconFamily?: 'ionicons' | 'material' | 'fontawesome' | 'fontawesome6' | 'materialcommunity';
  iconColor?: string;
}

const getLocationIcon = (type: LocationInputType) => {
  switch (type) {
    case 'origin':
    case 'position':
      return 'location';
    case 'destination':
      return 'airplane';
    default:
      return 'location';
  }
};

export const LocationInputField: React.FC<LocationInputFieldProps> = ({
  type,
  label,
  value,
  placeholder,
  onChangeText,
  onPress,
  editable = true,
  containerStyle,
  preFilledValue,
  iconName,
  iconFamily = 'ionicons',
  iconColor,
}) => {
  const displayValue = preFilledValue || value || '';
  const displayPlaceholder = placeholder || 'Entrer votre adresse';
  
  // Use custom icon if provided, otherwise use default based on type
  const finalIconName = iconName || getLocationIcon(type);
  const finalIconColor = iconColor || colors.text.secondary;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Input
        value={displayValue}
        placeholder={displayPlaceholder}
        onChangeText={onChangeText}
        onPress={onPress}
        editable={editable}
        leftIcon={
          <Icon
            name={finalIconName}
            size={20}
            color={finalIconColor}
            family={iconFamily}
          />
        }
        style={styles.input}
      />
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
  input: {
    ...typography.styles.input,
  },
});

