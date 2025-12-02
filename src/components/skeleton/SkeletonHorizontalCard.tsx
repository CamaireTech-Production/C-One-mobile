/**
 * SkeletonHorizontalCard Component
 * Loading placeholder for horizontal cards (Hotel, Tourism, Restaurant)
 * Matches the structure: image on top, content below
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, Dimensions } from 'react-native';

import { SkeletonBlock } from './SkeletonBlock';
import { colors, spacing } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SkeletonHorizontalCardProps {
  width?: number;
  style?: ViewStyle;
}

export const SkeletonHorizontalCard: React.FC<SkeletonHorizontalCardProps> = ({
  width = SCREEN_WIDTH * 0.67,
  style,
}) => {
  return (
    <View style={[styles.container, { width }, style]}>
      {/* Image skeleton on top */}
      <SkeletonBlock
        width="100%"
        height={160}
        borderRadius={16}
        style={styles.imageSkeleton}
      />
      
      {/* Content below image */}
      <View style={styles.content}>
        {/* Title and Rating row skeleton */}
        <View style={styles.titleRow}>
          <SkeletonBlock
            width="60%"
            height={20}
            borderRadius={4}
          />
          <SkeletonBlock
            width={80}
            height={16}
            borderRadius={4}
          />
        </View>
        
        {/* Price skeleton */}
        <SkeletonBlock
          width="50%"
          height={18}
          borderRadius={4}
          style={styles.priceSkeleton}
        />
        
        {/* Info row skeleton */}
        <View style={styles.infoRow}>
          <SkeletonBlock
            width={50}
            height={14}
            borderRadius={4}
          />
          <SkeletonBlock
            width={40}
            height={14}
            borderRadius={4}
          />
        </View>
        
        {/* Address skeleton */}
        <SkeletonBlock
          width="80%"
          height={14}
          borderRadius={4}
          style={styles.addressSkeleton}
        />
        
        {/* Button skeleton */}
        <SkeletonBlock
          width="100%"
          height={40}
          borderRadius={8}
          style={styles.buttonSkeleton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: spacing.base,
  },
  imageSkeleton: {
    marginBottom: 0,
  },
  content: {
    padding: spacing.base,
    gap: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  priceSkeleton: {
    marginBottom: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  addressSkeleton: {
    marginBottom: spacing.sm,
  },
  buttonSkeleton: {
    marginTop: spacing.xs,
  },
});

