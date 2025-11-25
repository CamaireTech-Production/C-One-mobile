/**
 * SocialButton Component
 * Social login button with icon/logo
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, shadows } from '../../theme';

export type SocialProvider = 'google' | 'facebook' | 'apple';

interface SocialButtonProps {
  provider: SocialProvider;
  onPress: () => void;
  style?: ViewStyle;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onPress,
  style,
}) => {
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          label: 'G',
          backgroundColor: colors.background.primary,
          textColor: colors.text.primary,
          borderColor: colors.border.normal,
        };
      case 'facebook':
        return {
          label: 'f',
          backgroundColor: '#1877F2',
          textColor: colors.text.inverse,
          borderColor: '#1877F2',
        };
      case 'apple':
        return {
          label: '🍎',
          backgroundColor: colors.text.primary,
          textColor: colors.text.inverse,
          borderColor: colors.text.primary,
        };
    }
  };

  const config = getProviderConfig();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          {
            color: config.textColor,
          },
        ]}
      >
        {config.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});

