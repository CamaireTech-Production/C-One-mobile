/**
 * SocialButton Component
 * Social login button with icon/logo from Figma
 */

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, spacing, shadows } from '../../theme';
import { GoogleIcon, FacebookIcon, AppleIcon } from './social-icons';

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
          Icon: GoogleIcon,
          backgroundColor: colors.background.primary,
          borderColor: colors.border.normal,
          iconSize: 24,
          iconColor: undefined,
        };
      case 'facebook':
        return {
          Icon: FacebookIcon,
          backgroundColor: '#1877F2',
          borderColor: '#1877F2',
          iconSize: 24,
          iconColor: colors.text.inverse,
        };
      case 'apple':
        return {
          Icon: AppleIcon,
          backgroundColor: colors.text.primary,
          borderColor: colors.text.primary,
          iconSize: 24,
          iconColor: colors.text.inverse,
        };
    }
  };

  const config = getProviderConfig();
  const { Icon } = config;

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
      <Icon
        width={config.iconSize}
        height={config.iconSize}
        color={config.iconColor}
      />
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
});

