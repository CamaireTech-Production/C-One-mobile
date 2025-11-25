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
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && !error && styles.inputFocused,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.text.tertiary}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textInputProps}
      />
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
  input: {
    ...typography.styles.input,
    color: colors.text.primary,
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.border.normal,
    borderRadius: 8,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    minHeight: 48,
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

