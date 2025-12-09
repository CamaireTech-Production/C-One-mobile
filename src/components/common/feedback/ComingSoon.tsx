/**
 * ComingSoon Component
 * Reusable component to display "coming soon" messages for unimplemented features
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '../icons';
import { colors, typography, spacing } from '../../../theme';

export interface ComingSoonProps {
  /**
   * Optional custom title to display
   * If not provided, uses default translation key
   */
  title?: string;
  /**
   * Optional custom message to display
   * If not provided, uses default translation key
   */
  message?: string;
  /**
   * Optional icon name to display
   * If not provided, uses default time icon
   */
  iconName?: string;
  /**
   * Optional icon family
   */
  iconFamily?: 'fontawesome6' | 'ionicons' | 'material';
  /**
   * Optional icon style (for fontawesome6)
   */
  iconStyle?: 'solid' | 'regular';
  /**
   * Custom style for the container
   */
  style?: ViewStyle;
  /**
   * Whether to show the icon
   */
  showIcon?: boolean;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  message,
  iconName = 'time-outline',
  iconFamily = 'ionicons',
  iconStyle = 'regular',
  style,
  showIcon = true,
}) => {
  const { t } = useTranslation();

  const displayTitle = title || t('comingSoon.title', 'Bientôt disponible');
  const displayMessage =
    message ||
    t(
      'comingSoon.message',
      'Cette fonctionnalité sera bientôt disponible. Restez à l\'écoute !'
    );

  return (
    <View style={[styles.container, style]}>
      {showIcon && (
        <View style={styles.iconContainer}>
          <Icon
            name={iconName}
            size={64}
            color={colors.primary.normal}
            family={iconFamily}
            fa6Style={iconFamily === 'fontawesome6' ? iconStyle : undefined}
          />
        </View>
      )}
      <Text style={styles.title}>{displayTitle}</Text>
      <Text style={styles.message}>{displayMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  iconContainer: {
    marginBottom: spacing.lg,
    opacity: 0.8,
  },
  title: {
    ...typography.styles.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  message: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

