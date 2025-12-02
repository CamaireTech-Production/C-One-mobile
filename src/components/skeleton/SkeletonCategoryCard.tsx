/**
 * SkeletonCategoryCard Component
 * Loading placeholder for category cards (Tourism, Restaurant)
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, Dimensions } from 'react-native';

import { SkeletonBlock } from './SkeletonBlock';
import { colors, spacing } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SkeletonCategoryCardProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
  showDescription?: boolean;
}

export const SkeletonCategoryCard: React.FC<SkeletonCategoryCardProps> = ({
  width = SCREEN_WIDTH * 0.67,
  height = 160,
  style,
  showDescription = false,
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
      <View style={[styles.contentOverlay, showDescription ? styles.contentOverlayLeft : styles.contentOverlayCenter]}>
        {/* Title skeleton */}
        <SkeletonBlock
          width="60%"
          height={20}
          borderRadius={4}
          style={styles.titleSkeleton}
        />
        
        {/* Description skeleton (optional) */}
        {showDescription && (
          <>
            <SkeletonBlock
              width="90%"
              height={14}
              borderRadius={4}
              style={styles.descriptionSkeleton}
            />
            <SkeletonBlock
              width="75%"
              height={14}
              borderRadius={4}
            />
          </>
        )}
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
  contentOverlayCenter: {
    alignItems: 'center',
  },
  contentOverlayLeft: {
    alignItems: 'flex-start',
  },
  titleSkeleton: {
    marginBottom: spacing.xs,
  },
  descriptionSkeleton: {
    marginBottom: spacing.xs,
  },
});

