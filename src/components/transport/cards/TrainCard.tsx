/**
 * TrainCard Component
 * Card displaying train offer with all details
 * Supports stops/intermediate cities
 * Gold theme design (same structure as FlightCard but different colors)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../../common/icons/Icon';
import { Button } from '../../common/forms/Button';
import type { TransportOffer } from '../../../types/transport';

interface TrainCardProps {
  offer: TransportOffer;
  onPress?: () => void;
  onReserve?: () => void;
  style?: ViewStyle;
}

export const TrainCard: React.FC<TrainCardProps> = ({
  offer,
  onPress,
  onReserve,
  style,
}) => {
  const formatPrice = (price: number, currency: string) => {
    return `${price}${currency}`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Route Header */}
      <View style={styles.routeHeader}>
        <View style={styles.locationContainer}>
          <Icon name="location" size={16} color={colors.transport.train.primary} family="ionicons" />
          <Text style={styles.locationText}>{offer.origin}</Text>
          {offer.originCode && (
            <Text style={styles.locationCode}>({offer.originCode})</Text>
          )}
        </View>

        <View style={styles.connectionLine}>
          <View style={styles.dashedLine} />
          <Icon
            name="train"
            size={20}
            color={colors.transport.train.primary}
            family="ionicons"
          />
          <View style={styles.dashedLine} />
        </View>

        <View style={styles.locationContainer}>
          <Icon name="location" size={16} color={colors.transport.train.primary} family="ionicons" />
          <Text style={styles.locationText}>{offer.destination}</Text>
          {offer.destinationCode && (
            <Text style={styles.locationCode}>({offer.destinationCode})</Text>
          )}
        </View>
      </View>

      {/* Times */}
      <View style={styles.timesContainer}>
        <Text style={styles.time}>{offer.departureTime}</Text>
        <Text style={styles.time}>{offer.arrivalTime}</Text>
      </View>

      {/* Stops Information */}
      {offer.stops && offer.stops.length > 0 && (
        <View style={styles.stopsContainer}>
          {offer.stops.map((stop, index) => (
            <View key={index} style={styles.stopItem}>
              <Text style={styles.stopText}>
                {stop.city} {stop.time}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Details Row */}
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Icon name="time-outline" size={16} color={colors.text.secondary} family="ionicons" />
          <Text style={styles.detailText}>{offer.duration}</Text>
        </View>

        <Text style={styles.detailText}>
          {offer.isNonStop ? 'Non stop' : `${offer.numberOfStops || offer.stops?.length || 0} transfer`}
        </Text>

        <Text style={styles.detailText}>
          {offer.passengersIncluded} Personnes
        </Text>
      </View>

      {/* Train Company & Price */}
      <View style={styles.footerRow}>
        {offer.trainCompany && (
          <Text style={styles.companyText}>{offer.trainCompany}</Text>
        )}
        <Text style={styles.priceText}>
          {formatPrice(offer.price, offer.currency)}
        </Text>
      </View>

      {/* Reserve Button */}
      <Button
        title="Réserver"
        onPress={onReserve || onPress || (() => {})}
        variant="primary"
        size="medium"
        fullWidth
        style={styles.reserveButton}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transport.train.card,
    borderRadius: 12,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.transport.train.border,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
  locationCode: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  connectionLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    flex: 1,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderTopWidth: 1,
    borderTopColor: colors.border.normal,
    borderStyle: 'dashed',
  },
  timesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  time: {
    ...typography.styles.bodyBold18,
    color: colors.text.primary,
  },
  stopsContainer: {
    marginBottom: spacing.sm,
    paddingLeft: spacing.base,
  },
  stopItem: {
    marginBottom: spacing.xs,
  },
  stopText: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailText: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  companyText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
  },
  priceText: {
    ...typography.styles.bodyBold18,
    color: colors.transport.train.primary,
  },
  reserveButton: {
    backgroundColor: colors.transport.train.success,
  },
});

