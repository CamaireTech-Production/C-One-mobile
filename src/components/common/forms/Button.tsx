/**
 * Button Component
 * Primary button component with variants and sizes
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors, typography, spacing, shadows } from '../../../theme';
import { Spinner } from '../feedback/Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyles: (ViewStyle | undefined)[] = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    fullWidth ? styles.fullWidth : undefined,
    (disabled || loading) ? styles.disabled : undefined,
    style,
  ];

  const textStyles: (TextStyle | undefined)[] = [
    styles.textBase,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    (disabled || loading) ? styles.disabledText : undefined,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <Spinner
            size="small"
            color={variant === 'primary' ? colors.text.inverse : colors.primary.normal}
          />
        </View>
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12, // Increased border radius for transport forms
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },
  // Variants
  primary: {
    backgroundColor: colors.primary.normal,
  },
  secondary: {
    backgroundColor: colors.secondary.light,
    borderWidth: 1,
    borderColor: colors.border.normal,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary.normal,
  },
  text: {
    backgroundColor: 'transparent',
    ...shadows.small,
    shadowOpacity: 0,
    elevation: 0,
  },
  // Sizes
  smallSize: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    minHeight: 36,
  },
  mediumSize: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  largeSize: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  // Text styles
  textBase: {
    ...typography.styles.button,
  },
  primaryText: {
    color: colors.text.inverse,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  outlineText: {
    color: colors.primary.normal,
  },
  textText: {
    color: colors.primary.normal,
  },
  smallText: {
    ...typography.styles.buttonSmall,
  },
  mediumText: {
    ...typography.styles.button,
  },
  largeText: {
    ...typography.styles.buttonLarge,
  },
  disabledText: {
    opacity: 0.7,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

