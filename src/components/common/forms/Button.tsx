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
  backgroundColor?: string; // Custom background color that overrides variant color
  textColor?: string; // Custom text color that overrides variant text color
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
  backgroundColor,
  textColor,
}) => {
  // Build button styles - backgroundColor prop must override variant and style
  const buttonStyles: (ViewStyle | undefined)[] = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    fullWidth ? styles.fullWidth : undefined,
    (disabled || loading) ? styles.disabled : undefined,
    // Apply custom style first
    style,
    // Apply custom backgroundColor LAST to ensure it overrides everything including style.backgroundColor
    backgroundColor ? { backgroundColor } : undefined,
  ];
  
  const finalButtonStyles = StyleSheet.flatten(buttonStyles);

  const textStyles: (TextStyle | undefined)[] = [
    styles.textBase,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    (disabled || loading) ? styles.disabledText : undefined,
    // Apply custom textColor if provided (overrides variant text color)
    textColor ? { color: textColor } : undefined,
    // Apply custom textStyle last to ensure it overrides everything
    textStyle,
  ];
  
  // Flatten styles to ensure proper merging
  const finalTextStyles = StyleSheet.flatten(textStyles);

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
            color={textColor || (variant === 'primary' ? colors.text.inverse : colors.primary.normal)}
          />
        </View>
      ) : (
        <Text style={finalTextStyles}>{title}</Text>
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

