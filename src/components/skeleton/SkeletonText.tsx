/**
 * SkeletonText Component
 * Loading placeholder for text elements
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors, spacing } from '../../theme';

interface SkeletonTextProps {
  width?: number | string;
  height?: number;
  lines?: number;
  style?: ViewStyle;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  width = '100%',
  height = 16,
  lines = 1,
  style,
}) => {
  return (
    <SkeletonPlaceholder
      backgroundColor={colors.background.secondary}
      highlightColor={colors.background.tertiary}
    >
      <View style={[styles.container, style]}>
        {Array.from({ length: lines }).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width={index === lines - 1 ? '80%' : width}
            height={height}
            borderRadius={4}
            marginBottom={index < lines - 1 ? spacing.xs : 0}
          />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

