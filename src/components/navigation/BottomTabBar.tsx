import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, typography, shadows } from '../../theme';

/**
 * Custom bottom tab bar matching Figma design.
 * Adds rounded container, floating effect and custom active states.
 */
export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: Math.max(insets.bottom, spacing.sm),
        },
      ]}
    >
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel ??
            options.title ??
            (route.name as string);

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const color = isFocused
            ? colors.primary.normal
            : colors.text.secondary;

          const icon =
            typeof options.tabBarIcon === 'function'
              ? options.tabBarIcon({
                  focused: isFocused,
                  color,
                  size: 24,
                })
              : null;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tab, isFocused && styles.tabFocused]}
              activeOpacity={0.9}
            >
              <View style={styles.iconContainer}>{icon}</View>
              <Text
                style={[
                  styles.label,
                  isFocused ? styles.labelActive : styles.labelInactive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.lg,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderRadius: 32,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
    ...shadows.medium,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    borderRadius: 24,
  },
  tabFocused: {
    backgroundColor: colors.primary.light,
  },
  iconContainer: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs / 2,
  },
  label: {
    ...typography.styles.bodyRegular12,
  },
  labelActive: {
    color: colors.primary.normal,
  },
  labelInactive: {
    color: colors.text.secondary,
  },
});


