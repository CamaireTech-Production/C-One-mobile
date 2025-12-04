/**
 * SkeletonTransportCard Component
 * Loading placeholder for TransportCard components (flights and trains)
 * Matches the exact layout structure of TransportCard
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import { SkeletonBlock } from './SkeletonBlock';
import { colors, spacing } from '../../theme';

interface SkeletonTransportCardProps {
  style?: ViewStyle;
  isFlight?: boolean; // If true, shows airline column (column2)
}

export const SkeletonTransportCard: React.FC<SkeletonTransportCardProps> = ({
  style,
  isFlight = false,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Main Row: Column 1 (towns + times) and Column 2 (provider - only for flights) */}
      <View style={styles.mainRow}>
        {/* Column 1: Towns and Times */}
        <View style={styles.column1}>
          {/* Row 1: Towns with icons */}
          <View style={styles.townsRow}>
            {/* Left: Origin with icon */}
            <View style={styles.townLeft}>
              <View style={styles.townItem}>
                <SkeletonBlock
                  width={24}
                  height={24}
                  borderRadius={12}
                  style={styles.townIconSkeleton}
                />
                <SkeletonBlock
                  width={60}
                  height={16}
                  borderRadius={4}
                />
              </View>
            </View>

            {/* Right: Destination with icon */}
            <View style={styles.townRight}>
              <View style={styles.townItem}>
                <SkeletonBlock
                  width={24}
                  height={24}
                  borderRadius={12}
                  style={styles.townIconSkeleton}
                />
                <SkeletonBlock
                  width={70}
                  height={16}
                  borderRadius={4}
                />
              </View>
            </View>
          </View>

          {/* Row 2: Times with connector */}
          <View style={styles.timesRow}>
            {/* Left: Departure Time */}
            <View style={styles.timeLeft}>
              <SkeletonBlock
                width={50}
                height={20}
                borderRadius={4}
              />
            </View>

            {/* Middle: Connector (dots + dashed line + icon) */}
            <View style={styles.timeConnector}>
              <SkeletonBlock
                width={6}
                height={6}
                borderRadius={3}
                style={styles.connectorDot}
              />
              <SkeletonBlock
                width="60%"
                height={1}
                borderRadius={0}
                style={styles.connectorLine}
              />
              <SkeletonBlock
                width={16}
                height={16}
                borderRadius={8}
                style={styles.connectorIcon}
              />
              <SkeletonBlock
                width={6}
                height={6}
                borderRadius={3}
                style={styles.connectorDot}
              />
            </View>

            {/* Right: Arrival Time */}
            <View style={styles.timeRight}>
              <SkeletonBlock
                width={50}
                height={20}
                borderRadius={4}
              />
            </View>
          </View>
        </View>

        {/* Column 2: Provider (airline for flights only) */}
        {isFlight && (
          <View style={styles.column2}>
            <View style={styles.providerContainer}>
              <SkeletonBlock
                width={20}
                height={20}
                borderRadius={10}
                style={styles.providerLogoSkeleton}
              />
              <View style={styles.providerNameContainer}>
                <SkeletonBlock
                  width={50}
                  height={14}
                  borderRadius={4}
                  style={styles.providerNameSkeleton}
                />
                <SkeletonBlock
                  width={40}
                  height={14}
                  borderRadius={4}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Row 3: Duration, Type (Non stop), Number of people, Price */}
      <View style={styles.detailsRow}>
        <View style={styles.detailItemWrapper}>
          <View style={styles.detailItem}>
            <SkeletonBlock
              width={16}
              height={16}
              borderRadius={8}
            />
            <SkeletonBlock
              width={50}
              height={14}
              borderRadius={4}
            />
          </View>
        </View>

        <View style={styles.detailItemWrapper}>
          <SkeletonBlock
            width={60}
            height={14}
            borderRadius={4}
          />
        </View>

        <View style={styles.detailItemWrapper}>
          <SkeletonBlock
            width={70}
            height={14}
            borderRadius={4}
          />
        </View>

        <View style={styles.detailItemWrapper}>
          <SkeletonBlock
            width={60}
            height={24}
            borderRadius={4}
          />
        </View>
      </View>

      {/* Row 4: Reserve Button */}
      <SkeletonBlock
        width="100%"
        height={44}
        borderRadius={8}
        style={styles.reserveButtonSkeleton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: spacing.base,
    marginBottom: spacing.base,
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.background.tertiary,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  column1: {
    width: '70%',
  },
  column2: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  townsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  timesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  townLeft: {
    alignItems: 'flex-start',
    flex: 1,
  },
  townRight: {
    alignItems: 'flex-end',
    flex: 1,
  },
  timeLeft: {
    alignItems: 'flex-start',
    flexShrink: 0,
  },
  timeRight: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  townItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  townIconSkeleton: {
    marginRight: spacing.xs,
  },
  timeConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: 0,
  },
  connectorDot: {
    marginHorizontal: 2,
  },
  connectorLine: {
    flex: 1,
    marginHorizontal: 4,
  },
  connectorIcon: {
    marginHorizontal: 4,
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerLogoSkeleton: {
    marginRight: spacing.xs,
  },
  providerNameContainer: {
    alignItems: 'flex-start',
  },
  providerNameSkeleton: {
    marginBottom: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  },
  detailItemWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  reserveButtonSkeleton: {
    marginTop: spacing.xs,
  },
});

