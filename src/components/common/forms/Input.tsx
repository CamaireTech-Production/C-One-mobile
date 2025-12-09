/**
 * Input Component
 * Text input with validation states
 */

import React, { useMemo, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../icons/Icon';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  containerStyle?: ViewStyle;
  // Normal icons
  leftIcon?: React.ReactNode;
  leftIconStyle?: ViewStyle;
  rightIcon?: React.ReactNode;
  rightIconStyle?: ViewStyle;
  onRightIconPress?: () => void;
  // Error icons (shown when error exists)
  errorLeftIcon?: React.ReactNode;
  errorLeftIconStyle?: ViewStyle;
  errorRightIcon?: React.ReactNode;
  errorRightIconStyle?: ViewStyle;
  onErrorRightIconPress?: () => void;
  // Password toggle
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
  leftIconStyle,
  rightIcon,
  rightIconStyle,
  onRightIconPress,
  errorLeftIcon,
  errorLeftIconStyle,
  errorRightIcon,
  errorRightIconStyle,
  onErrorRightIconPress,
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
  const shouldShowPasswordToggle = showPasswordToggle && !error;
  const defaultErrorIcon = useMemo(
    () => <Icon name="alert-circle-outline" size={20} color={colors.error} />,
    []
  );

  // Determine which icons to show based on error state
  const displayLeftIcon = error ? errorLeftIcon || leftIcon : leftIcon;
  const displayRightIcon = error ? errorRightIcon || defaultErrorIcon : rightIcon;
  const displayLeftIconStyle = error ? errorLeftIconStyle || leftIconStyle : leftIconStyle;
  const displayRightIconStyle = error ? errorRightIconStyle || rightIconStyle : rightIconStyle;

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
        {displayLeftIcon && (
          <View style={[styles.leftIcon, displayLeftIconStyle]}>
            {displayLeftIcon}
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            displayLeftIcon ? styles.inputWithLeftIcon : undefined,
            (displayRightIcon || shouldShowPasswordToggle) ? styles.inputWithRightIcon : undefined,
            style,
          ]}
          placeholderTextColor={colors.text.tertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={displaySecureTextEntry}
          {...textInputProps}
        />
        {shouldShowPasswordToggle && (
          <TouchableOpacity
            style={[styles.rightIcon, displayRightIconStyle]}
            onPress={handleTogglePassword}
            activeOpacity={0.7}
          >
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        )}
        {displayRightIcon && !shouldShowPasswordToggle && (
          <TouchableOpacity
            style={[styles.rightIcon, displayRightIconStyle]}
            onPress={error ? onErrorRightIconPress || onRightIconPress : onRightIconPress}
            activeOpacity={0.7}
            disabled={!onErrorRightIconPress && !onRightIconPress}
          >
            {displayRightIcon}
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
    borderRadius: 12, // Increased border radius for transport forms
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

