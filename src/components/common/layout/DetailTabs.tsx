/**
 * DetailTabs Component
 * Tabs for detail screen (Transport, Hotel, Tourisme, Restaurant)
 * With icons on the left, background color #F2F4F7
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import { colors, spacing } from '../../../theme';
import { Tabs, TabOption } from '../tabs/Tabs';
import { Icon } from '../icons/Icon';

export type DetailTabKey = 'transport' | 'hotel' | 'tourism' | 'restaurant';

interface DetailTabsProps {
  value: DetailTabKey;
  onChange: (key: DetailTabKey) => void;
  style?: ViewStyle;
}

const getTabIcon = (key: DetailTabKey, isActive: boolean) => {
  const iconColor = isActive ? colors.primary.normal : colors.text.secondary;
  const iconSize = 18;

  switch (key) {
    case 'transport':
      return (
        <Icon
          name={isActive ? 'check-circle-outline' : 'circle-outline'}
          size={iconSize}
          color={iconColor}
          family="materialcommunity"
        />
      );
    case 'hotel':
      return (
        <Icon
          name={isActive ? 'check-circle-outline' : 'circle-outline'}
          size={iconSize}
          color={iconColor}
          family="materialcommunity"
        />
      );
    case 'tourism':
      return (
        <Icon
          name={isActive ? 'check-circle-outline' : 'circle-outline'}
          size={iconSize}
          color={iconColor}
          family="materialcommunity"
        />
      );
    case 'restaurant':
      return (
        <Icon
          name={isActive ? 'check-circle-outline' : 'circle-outline'}
          size={iconSize}
          color={iconColor}
          family="materialcommunity"
        />
      );
    default:
      return null;
  }
};

export const DetailTabs: React.FC<DetailTabsProps> = ({
  value,
  onChange,
  style,
}) => {
  const tabs: TabOption[] = [
    {
      key: 'transport',
      label: 'Transports',
      icon: getTabIcon('transport', value === 'transport'),
      iconPosition: 'left',
    },
    {
      key: 'hotel',
      label: 'Hotels',
      icon: getTabIcon('hotel', value === 'hotel'),
      iconPosition: 'left',
    },
    {
      key: 'tourism',
      label: 'Tourisme',
      icon: getTabIcon('tourism', value === 'tourism'),
      iconPosition: 'left',
    },
    {
      key: 'restaurant',
      label: 'Restaurant',
      icon: getTabIcon('restaurant', value === 'restaurant'),
      iconPosition: 'left',
    },
  ];

  return (
    <View style={[styles.container, style]}>
      <Tabs
        options={tabs}
        value={value}
        onChange={(key) => onChange(key as DetailTabKey)}
        variant="segmented"
        fullWidth
        style={styles.tabsContainer}
        tabStyle={styles.tab}
        activeTabStyle={styles.activeTab}
        inactiveTabStyle={styles.inactiveTab}
        activeTextStyle={styles.activeText}
        inactiveTextStyle={styles.inactiveText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary.lightHover, // #F2F4F7
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
  },
  tabsContainer: {
    backgroundColor: colors.secondary.lightHover,
  },
  tab: {
    paddingVertical: spacing.sm,
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  activeText: {
    color: colors.primary.normal,
  },
  inactiveText: {
    color: colors.text.secondary,
  },
});

