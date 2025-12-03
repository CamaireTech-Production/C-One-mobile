/**
 * FlightCard Component
 * Card displaying flight offer with all details
 * Supports stops/intermediate cities
 * Blue theme design
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../../common/icons/Icon';
import { Button } from '../../common/forms/Button';
import type { TransportOffer } from '../../../types/transport';

interface FlightCardProps {
  offer: TransportOffer;
  onPress?: () => void;
  onReserve?: () => void;
  style?: ViewStyle;
}

export const FlightCard: React.FC<FlightCardProps> = ({
  offer,
  onPress,
  onReserve,
  style,
}) => {
  const { t } = useTranslation();
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
          <Icon name="location" size={16} color={colors.transport.flight.primary} family="ionicons" />
          <Text style={styles.locationText}>{offer.origin}</Text>
          {offer.originCode && (
            <Text style={styles.locationCode}>({offer.originCode})</Text>
          )}
        </View>

        <View style={styles.connectionLine}>
          <View style={styles.dashedLine} />
          <Icon
            name="airplane"
            size={20}
            color={colors.transport.flight.primary}
            family="ionicons"
          />
          <View style={styles.dashedLine} />
        </View>

        <View style={styles.locationContainer}>
          <Icon name="location" size={16} color={colors.transport.flight.primary} family="ionicons" />
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
          {offer.isNonStop ? 'Non stop' : `${offer.numberOfStops || offer.stops?.length || 0} escales`}
        </Text>

        <Text style={styles.detailText}>
          {offer.passengersIncluded} Personnes
        </Text>
      </View>

      {/* Airline & Price */}
      <View style={styles.footerRow}>
        {offer.airline && (
          <Text style={styles.airlineText}>{offer.airline}</Text>
        )}
        <Text style={styles.priceText}>
          {formatPrice(offer.price, offer.currency)}
        </Text>
      </View>

      {/* Reserve Button */}
      <Button
        title={t('transport.common.reserve')}
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
    backgroundColor: colors.transport.flight.card,
    borderRadius: 12,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.transport.flight.border,
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
  airlineText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
  },
  priceText: {
    ...typography.styles.bodyBold18,
    color: colors.transport.flight.primary,
  },
  reserveButton: {
    backgroundColor: colors.transport.flight.success,
  },
});

