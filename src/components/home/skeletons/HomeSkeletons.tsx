import React from 'react';
import { View, StyleSheet } from 'react-native';

import { SkeletonBlock } from '../../skeleton/SkeletonBlock';
import { spacing } from '../../../theme';

interface SkeletonHorizontalProps {
  itemWidth?: number;
  itemHeight?: number;
  itemCount?: number;
}

export const SkeletonHorizontalCards: React.FC<SkeletonHorizontalProps> = ({
  itemWidth = 160,
  itemHeight = 140,
  itemCount = 3,
}) => (
  <View style={styles.horizontalContainer}>
    {Array.from({ length: itemCount }).map((_, index) => (
      <SkeletonBlock
        key={`horizontal-${index}`}
        width={itemWidth}
        height={itemHeight}
      />
    ))}
  </View>
);

interface SkeletonBookingListProps {
  itemCount?: number;
}

export const SkeletonBookingList: React.FC<SkeletonBookingListProps> = ({
  itemCount = 3,
}) => (
  <View style={styles.bookingContainer}>
    {Array.from({ length: itemCount }).map((_, index) => (
      <SkeletonBlock
        key={`booking-${index}`}
        height={72}
        style={{ marginBottom: spacing.sm }}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    gap: spacing.base,
  },
  bookingContainer: {
    width: '100%',
  },
});


