/**
 * MenuItem Component
 * Reusable menu item with icon left, title, and icon right
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../icons/Icon';

export interface MenuItemProps {
  title: string;
  onPress?: () => void;
  // Left icon
  leftIconName?: string;
  leftIconFamily?: 'ionicons' | 'material' | 'fontawesome' | 'fontawesome6' | 'materialcommunity';
  leftIconSize?: number;
  leftIconColor?: string;
  // Right icon (usually arrow)
  rightIconName?: string;
  rightIconFamily?: 'ionicons' | 'material' | 'fontawesome' | 'fontawesome6' | 'materialcommunity';
  rightIconSize?: number;
  rightIconColor?: string;
  // Styling
  variant?: 'default' | 'danger'; // For logout and other destructive actions
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  showBackground?: boolean; // Whether to show background color (default: true)
  showRightIcon?: boolean; // Whether to show right icon (default: true)
}

export const MenuItem: React.FC<MenuItemProps> = ({
  title,
  onPress,
  leftIconName,
  leftIconFamily = 'ionicons',
  leftIconSize = 20,
  leftIconColor,
  rightIconName = 'chevron-forward',
  rightIconFamily = 'ionicons',
  rightIconSize = 18,
  rightIconColor,
  variant = 'default',
  containerStyle,
  textStyle,
  disabled = false,
  showBackground = true,
  showRightIcon = true,
}) => {
  const isDanger = variant === 'danger';
  const finalLeftIconColor = leftIconColor || (isDanger ? colors.error : colors.text.primary);
  const finalRightIconColor = rightIconColor || (isDanger ? colors.error : colors.text.secondary);
  const finalTextColor = isDanger ? colors.error : colors.text.primary;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !showBackground && styles.containerNoBackground,
        containerStyle,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || !onPress}
    >
      {/* Left Icon */}
      {leftIconName && (
        <View style={styles.leftIconContainer}>
          <Icon
            name={leftIconName}
            size={leftIconSize}
            color={finalLeftIconColor}
            family={leftIconFamily}
          />
        </View>
      )}

      {/* Title */}
      <Text
        style={[
          styles.title,
          { color: finalTextColor },
          textStyle,
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>

      {/* Right Icon */}
      {showRightIcon && rightIconName && (
        <View style={styles.rightIconContainer}>
          <Icon
            name={rightIconName}
            size={rightIconSize}
            color={finalRightIconColor}
            family={rightIconFamily}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.menuCard,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.sm,
    minHeight: 56,
  },
  containerNoBackground: {
    backgroundColor: 'transparent',
  },
  leftIconContainer: {
    marginRight: spacing.base,
    width: 24,
    alignItems: 'center',
  },
  title: {
    ...typography.styles.bodyRegular16,
    flex: 1,
    color: colors.text.primary,
  },
  rightIconContainer: {
    marginLeft: spacing.base,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.text.disabled,
  },
});

