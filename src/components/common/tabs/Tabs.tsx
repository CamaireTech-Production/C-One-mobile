import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { colors, spacing, typography } from '../../../theme';

export type TabOption = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right'; // Position de l'icône par rapport au texte
  badge?: string | number;
  disabled?: boolean;
  tabStyle?: ViewStyle; // Style personnalisé pour cette option spécifique
  tabTextStyle?: TextStyle; // Style de texte personnalisé pour cette option
};

export type TabsVariant = 'segmented' | 'pill' | 'underline';

export interface TabsProps {
  options: TabOption[];
  value: string;
  onChange: (key: string) => void;
  variant?: TabsVariant;
  fullWidth?: boolean;
  style?: ViewStyle;
  tabStyle?: ViewStyle; // Style par défaut pour tous les tabs
  tabTextStyle?: TextStyle; // Style de texte par défaut pour tous les tabs
  iconPosition?: 'left' | 'right'; // Position par défaut de l'icône
  gap?: number; // Espacement entre les tabs
}

/**
 * Tabs Component
 * Generic tab group supporting multiple variants (segmented, pill, underline)
 * Used for sections like "Autres pays / Ma position" or filter chips.
 */
export const Tabs: React.FC<TabsProps> = ({
  options,
  value,
  onChange,
  variant = 'segmented',
  fullWidth = true,
  style,
  tabStyle,
  tabTextStyle,
  iconPosition: defaultIconPosition = 'left',
  gap,
}) => {
  const containerStyle = [
    styles.container,
    variant === 'segmented' && styles.segmentedContainer,
    gap !== undefined && { gap },
    style,
  ];

  return (
    <View style={containerStyle}>
      {options.map((option) => {
        const isActive = option.key === value;
        const {
          tabBase,
          tabActive,
          textBase,
          textActive,
        } = getVariantStyles(variant);

        const finalIconPosition = option.iconPosition ?? defaultIconPosition;
        const showIcon = !!option.icon;

        return (
          <Pressable
            key={option.key}
            style={[
              styles.tab,
              tabBase,
              isActive && tabActive,
              !fullWidth && styles.tabAuto,
              option.disabled && styles.tabDisabled,
              tabStyle, // Style par défaut
              option.tabStyle, // Style spécifique à l'option (écrase le style par défaut)
            ]}
            onPress={() => !option.disabled && onChange(option.key)}
            disabled={option.disabled}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive, disabled: option.disabled }}
          >
            <View style={styles.tabContent}>
              {showIcon && finalIconPosition === 'left' && (
                <View style={styles.icon}>
                  {option.icon}
                </View>
              )}
              <Text
                style={[
                  styles.tabText,
                  textBase,
                  isActive && textActive,
                  tabTextStyle, // Style par défaut
                  option.tabTextStyle, // Style spécifique à l'option
                ]}
              >
                {option.label}
              </Text>
              {showIcon && finalIconPosition === 'right' && (
                <View style={styles.icon}>
                  {option.icon}
                </View>
              )}
              {option.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{option.badge}</Text>
                </View>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const getVariantStyles = (variant: TabsVariant) => {
  switch (variant) {
    case 'pill':
      return {
        tabBase: styles.pillTab,
        tabActive: styles.pillTabActive,
        textBase: styles.pillText,
        textActive: styles.pillTextActive,
      };
    case 'underline':
      return {
        tabBase: styles.underlineTab,
        tabActive: styles.underlineTabActive,
        textBase: styles.underlineText,
        textActive: styles.underlineTextActive,
      };
    case 'segmented':
    default:
      return {
        tabBase: styles.segmentedTab,
        tabActive: styles.segmentedTabActive,
        textBase: styles.segmentedText,
        textActive: styles.segmentedTextActive,
      };
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  segmentedContainer: {
    backgroundColor: colors.background.tertiary,
    padding: spacing.xs,
    borderRadius: 999,
  },
  tab: {
    flex: 1,
    borderRadius: 999,
  },
  tabAuto: {
    flex: undefined,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  segmentedTab: {
    paddingVertical: spacing.sm,
  },
  segmentedTabActive: {
    backgroundColor: colors.primary.normal,
  },
  segmentedText: {
    ...typography.styles.bodyMedium14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  segmentedTextActive: {
    color: colors.text.inverse,
  },
  pillTab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderWidth: 1,
    borderColor: colors.border.normal,
    backgroundColor: colors.background.primary,
  },
  pillTabActive: {
    backgroundColor: colors.primary.light,
    borderColor: colors.primary.normal,
  },
  pillText: {
    ...typography.styles.bodyMedium14,
    color: colors.text.secondary,
  },
  pillTextActive: {
    color: colors.primary.normal,
  },
  underlineTab: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  underlineTabActive: {
    borderBottomColor: colors.primary.normal,
  },
  underlineText: {
    ...typography.styles.bodyMedium14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  underlineTextActive: {
    color: colors.text.primary,
  },
  tabText: {
    textTransform: 'none',
  },
  tabDisabled: {
    opacity: 0.4,
  },
  badge: {
    minWidth: 20,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    ...typography.styles.caption,
    color: colors.text.inverse,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


