/**
 * SkeletonCard Component
 * Loading placeholder for card components
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';

import { SkeletonBlock } from './SkeletonBlock';
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
    <View style={[styles.container, { width, height }, style]}>
      {showImage && (
        <SkeletonBlock
          width="100%"
          height={120}
          borderRadius={8}
          style={{ marginBottom: spacing.md }}
        />
      )}
      <SkeletonBlock
        width="80%"
        height={16}
        borderRadius={4}
        style={{ marginBottom: spacing.sm }}
      />
      {lines >= 2 && (
        <SkeletonBlock
          width="60%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: spacing.sm }}
        />
      )}
      {lines >= 3 && (
        <SkeletonBlock
          width="70%"
          height={16}
          borderRadius={4}
        />
      )}
    </View>
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

