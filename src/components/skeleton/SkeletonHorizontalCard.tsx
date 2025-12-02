/**
 * SkeletonHorizontalCard Component
 * Loading placeholder for horizontal cards (Hotel, Tourism, Restaurant)
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, Dimensions } from 'react-native';

import { SkeletonBlock } from './SkeletonBlock';
import { colors, spacing } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SkeletonHorizontalCardProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
}

export const SkeletonHorizontalCard: React.FC<SkeletonHorizontalCardProps> = ({
  width = SCREEN_WIDTH * 0.67,
  height = 200,
  style,
}) => {
  return (
    <View style={[styles.container, { width, height }, style]}>
      {/* Image skeleton */}
      <SkeletonBlock
        width="100%"
        height="100%"
        borderRadius={16}
        style={styles.imageSkeleton}
      />
      
      {/* Content overlay skeleton */}
      <View style={styles.contentOverlay}>
        {/* Title skeleton */}
        <SkeletonBlock
          width="70%"
          height={20}
          borderRadius={4}
          style={styles.titleSkeleton}
        />
        
        {/* Rating/Price skeleton */}
        <SkeletonBlock
          width="50%"
          height={16}
          borderRadius={4}
          style={styles.priceSkeleton}
        />
        
        {/* Info row skeleton */}
        <View style={styles.infoRow}>
          <SkeletonBlock
            width={60}
            height={14}
            borderRadius={4}
          />
          <SkeletonBlock
            width={50}
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
          width={100}
          height={36}
          borderRadius={8}
          style={styles.buttonSkeleton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: spacing.base,
    position: 'relative',
  },
  imageSkeleton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.base,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  titleSkeleton: {
    marginBottom: spacing.xs,
  },
  priceSkeleton: {
    marginBottom: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  addressSkeleton: {
    marginBottom: spacing.sm,
  },
  buttonSkeleton: {
    marginTop: spacing.xs,
  },
});

