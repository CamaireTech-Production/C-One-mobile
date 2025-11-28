/**
 * TransportCard Component
 * Card displaying transport option with icon, title, and description
 * Used in grid layout (2 per row)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { colors, spacing, typography } from '../../../theme';
import { Icon } from '../icons/Icon';

export type TransportType = 'plane' | 'train' | 'car';

interface TransportCardProps {
  type: TransportType;
  title: string;
  description: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const getTransportIcon = (type: TransportType) => {
  switch (type) {
    case 'plane':
      return 'airplane';
    case 'train':
      return 'train';
    case 'car':
      return 'car';
    default:
      return 'airplane';
  }
};

export const TransportCard: React.FC<TransportCardProps> = ({
  type,
  title,
  description,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconContainer}>
        <Icon
          name={getTransportIcon(type)}
          size={30}
          color={colors.text.inverse}
          family="ionicons"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.tertiary, // #F5F7F9
    borderRadius: 20,
    padding: spacing.base,
    justifyContent: 'center',
    aspectRatio: 0.7, // Height will be longer than width (height = width / 0.7)
    minHeight: 180,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.primary.normal, // #288CBE
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  content: {
    gap: spacing.xs,
  },
  title: {
    ...typography.styles.bodyMedium18,
    paddingVertical: spacing.sm,
    color: colors.text.primary,
  },
  description: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
  },
});

