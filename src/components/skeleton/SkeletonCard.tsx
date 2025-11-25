/**
 * SkeletonCard Component
 * Loading placeholder for card components
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors, spacing } from '../../theme';

interface SkeletonCardProps {
  width?: DimensionValue;
  height?: number;
  style?: ViewStyle;
  showImage?: boolean;
  lines?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  width = '100%',
  height = 200,
  style,
  showImage = true,
  lines = 2,
}) => {
  return (
    <SkeletonPlaceholder
      backgroundColor={colors.background.secondary}
      highlightColor={colors.background.tertiary}
    >
      <View style={[styles.container, { width, height }, style]}>
        {showImage && (
          <SkeletonPlaceholder.Item
            width="100%"
            height={120}
            borderRadius={8}
            marginBottom={spacing.md}
          />
        )}
        <SkeletonPlaceholder.Item
          width="80%"
          height={16}
          borderRadius={4}
          marginBottom={spacing.sm}
        />
        {lines >= 2 && (
          <SkeletonPlaceholder.Item
            width="60%"
            height={16}
            borderRadius={4}
            marginBottom={spacing.sm}
          />
        )}
        {lines >= 3 && (
          <SkeletonPlaceholder.Item
            width="70%"
            height={16}
            borderRadius={4}
          />
        )}
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.base,
    marginBottom: spacing.base,
  },
});

