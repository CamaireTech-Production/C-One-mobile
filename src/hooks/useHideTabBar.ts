/**
 * useHideTabBar Hook
 * Hides the bottom tab bar when the screen is focused
 * 
 * Uses a hybrid approach:
 * 1. React Navigation's setOptions (standard approach)
 * 2. Context-based visibility (fallback for custom tab bars)
 */

import { useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTabBarVisibility } from '../contexts/TabBarVisibilityContext';

export const useHideTabBar = () => {
  const navigation = useNavigation();
  const { hide, show } = useTabBarVisibility();

  useFocusEffect(
    useCallback(() => {
      // Method 1: Use React Navigation's setOptions (standard approach)
      const parent = navigation.getParent();
      if (parent) {
        parent.setOptions({
          tabBarStyle: {
            display: 'none',
            height: 0,
            overflow: 'hidden',
          },
        });
      }

      // Method 2: Use context (for custom tab bars that don't respect tabBarStyle)
      hide();

      // Show tab bar when screen is unfocused (cleanup)
      return () => {
        // Method 1: Reset React Navigation options
        const parent = navigation.getParent();
        if (parent) {
          parent.setOptions({
            tabBarStyle: undefined, // Reset to default
          });
        }
        
        // Method 2: Reset context
        show();
      };
    }, [navigation, hide, show])
  );
};

