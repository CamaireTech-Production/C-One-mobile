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

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.normal,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border.light,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          ...typography.styles.bodyRegular12,
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('navigation.tabs.home'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} family="ionicons" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen} // Placeholder - will be replaced later
        options={{
          tabBarLabel: t('navigation.tabs.search'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} family="ionicons" />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={HomeScreen} // Placeholder - will be replaced later
        options={{
          tabBarLabel: t('navigation.tabs.bookings'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" size={size} color={color} family="ionicons" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen} // Placeholder - will be replaced later
        options={{
          tabBarLabel: t('navigation.tabs.profile'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} family="ionicons" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


