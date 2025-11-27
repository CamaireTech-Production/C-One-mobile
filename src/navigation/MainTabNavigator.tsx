/**
 * Main Tab Navigator
 * Handles navigation within the main app (after authentication)
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import { MainTabParamList } from '../types';
import { HomeScreen } from '../screens/home/HomeScreen';
import { Icon } from '../components/common';
import { colors, typography } from '../theme';
import { BottomTabBar } from '../components/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.normal,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          ...typography.styles.bodyRegular12,
          marginTop: 4,
        },
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('navigation.tabs.home'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="house" size={size} color={color} family="fontawesome6" fa6Style="regular" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen} // Placeholder - will be replaced later
        options={{
          tabBarLabel: t('navigation.tabs.search'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="arrow-down-wide-short" size={size} color={color} family="fontawesome6" fa6Style="solid" />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={HomeScreen} // Placeholder - will be replaced later
        options={{
          tabBarLabel: t('navigation.tabs.bookings'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" size={size} color={color} family="fontawesome6" fa6Style="regular" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen} // Placeholder - will be replaced later
        options={{
          tabBarLabel: t('navigation.tabs.profile'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} family="fontawesome6" fa6Style="regular" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


