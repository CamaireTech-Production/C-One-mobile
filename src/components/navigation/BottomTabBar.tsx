import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '../../theme';
import { useTabBarVisibility } from '../../contexts/TabBarVisibilityContext';

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
  const { isVisible } = useTabBarVisibility();

  // Check if tab bar should be hidden by checking all routes' tabBarStyle
  // When setOptions is called on the Tab Navigator, it affects all routes
  // We check the currently focused route's options
  const currentRoute = state.routes[state.index];
  const currentOptions = descriptors[currentRoute.key]?.options;
  const tabBarStyle = currentOptions?.tabBarStyle;
  
  // Also check if any route has tabBarStyle set (in case it's set globally)
  const hasHiddenTabBar = state.routes.some((route) => {
    const options = descriptors[route.key]?.options;
    const style = options?.tabBarStyle;
    if (style && typeof style === 'object') {
      return style.display === 'none' || style.height === 0;
    }
    return false;
  });
  
  // Hide tab bar if:
  // 1. Context says it should be hidden, OR
  // 2. tabBarStyle has display: 'none' or height: 0
  const shouldHide = !isVisible || hasHiddenTabBar || 
    (tabBarStyle && typeof tabBarStyle === 'object' && 
     (tabBarStyle.display === 'none' || tabBarStyle.height === 0));

  if (shouldHide) {
    return null;
  }

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: Math.max(insets.bottom, spacing.md),
        },
        tabBarStyle && typeof tabBarStyle === 'object' ? tabBarStyle : {},
      ]}
    >
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

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
            ? colors.text.inverse
            : colors.text.secondary;

          const icon =
            typeof options.tabBarIcon === 'function'
              ? options.tabBarIcon({
                  focused: isFocused,
                  color,
                  size: 20,
                })
              : null;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
              activeOpacity={0.9}
            >
              <View style={[styles.iconContainer, isFocused && styles.iconContainerActive]}>
                {icon}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background.primary,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: colors.border.light,
    borderWidth: 1,
    // paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    minHeight: 72,
    ...Platform.select({
      ios: {
        shadowColor: '#4B3425',
        shadowOpacity: 0.12,
        shadowRadius: 32,
        shadowOffset: { width: 0, height: -4 },
      },
      android: {
        elevation: 8,
      },
    }),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerActive: {
    backgroundColor: colors.primary.normal,
    borderRadius: 24,
  },
});


