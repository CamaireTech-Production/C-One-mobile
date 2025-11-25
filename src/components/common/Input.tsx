/**
 * Input Component
 * Text input with validation states
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  containerStyle,
  style,
  onFocus,
  onBlur,
  leftIcon,
  rightIcon,
  onRightIconPress,
  showPasswordToggle,
  onTogglePassword,
  secureTextEntry,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    onTogglePassword?.();
  };

  const displaySecureTextEntry = secureTextEntry && !showPassword;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          isFocused && !error && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || showPasswordToggle) && styles.inputWithRightIcon,
            style,
          ]}
          placeholderTextColor={colors.text.tertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={displaySecureTextEntry}
          {...textInputProps}
        />
        {showPasswordToggle && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={handleTogglePassword}
            activeOpacity={0.7}
          >
            <Text style={styles.iconText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        )}
        {rightIcon && !showPasswordToggle && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            activeOpacity={0.7}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.border.normal,
    borderRadius: 8,
    minHeight: 48,
  },
  input: {
    ...typography.styles.input,
    color: colors.text.primary,
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
  },
  inputWithLeftIcon: {
    paddingLeft: spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: spacing.xs,
  },
  leftIcon: {
    paddingLeft: spacing.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    paddingRight: spacing.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  inputFocused: {
    borderColor: colors.primary.normal,
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  errorText: {
    ...typography.styles.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
  hintText: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});

