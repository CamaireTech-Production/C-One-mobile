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

  // Get airline logo color (default blue, can be customized per airline)
  const getAirlineLogoColor = (airline?: string) => {
    if (!airline) return colors.transport.flight.primary;
    const airlineLower = airline.toLowerCase();
    if (airlineLower.includes('air india')) return '#EF4444'; // Red
    if (airlineLower.includes('indigo')) return colors.transport.flight.primary; // Blue
    return colors.transport.flight.primary; // Default blue
  };

  const airlineLogoColor = getAirlineLogoColor(offer.airline);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Top Row: Origin - Flight Path - Destination - Airline Logo */}
      <View style={styles.topRow}>
        {/* Origin with gold airplane icon */}
        <View style={styles.locationSection}>
          <Icon 
            name="airplane-takeoff" 
            size={20} 
            color={colors.yellow.normal} 
            family="materialcommunity" 
          />
          <Text style={styles.locationText}>{offer.origin}</Text>
          {offer.originCode && (
            <Text style={styles.locationCode}>({offer.originCode})</Text>
          )}
        </View>

        {/* Flight Path: Dashed line with circle and gray airplane */}
        <View style={styles.flightPath}>
          <View style={styles.dashedLine} />
          <View style={styles.pathCircle} />
          <Icon
            name="airplane"
            size={18}
            color={colors.text.secondary}
            family="ionicons"
          />
          <View style={styles.dashedLine} />
        </View>

        {/* Destination with gold airplane icon */}
        <View style={styles.locationSection}>
          <Icon 
            name="airplane-landing" 
            size={20} 
            color={colors.yellow.normal} 
            family="materialcommunity" 
          />
          <Text style={styles.locationText}>{offer.destination}</Text>
          {offer.destinationCode && (
            <Text style={styles.locationCode}>({offer.destinationCode})</Text>
          )}
        </View>

        {/* Airline Logo Circle */}
        {offer.airline && (
          <View style={[styles.airlineLogo, { backgroundColor: airlineLogoColor }]}>
            <Text style={styles.airlineLogoText}>
              {offer.airline.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)}
            </Text>
          </View>
        )}
      </View>

      {/* Times Row: Below origin and destination */}
      <View style={styles.timesRow}>
        <Text style={styles.time}>{offer.departureTime}</Text>
        <View style={styles.spacer} />
        <Text style={styles.time}>{offer.arrivalTime}</Text>
      </View>

      {/* Details Row: Duration, Non stop, Passengers, Price */}
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Icon name="time-outline" size={16} color={colors.transport.flight.primary} family="ionicons" />
          <Text style={styles.detailText}>{offer.duration}</Text>
        </View>

        <Text style={[styles.detailText, styles.nonStopText]}>
          {offer.isNonStop ? 'Non stop' : `${offer.numberOfStops || offer.stops?.length || 0} escales`}
        </Text>

        <Text style={styles.detailText}>
          {offer.passengersIncluded} Personnes
        </Text>

        {/* Price on the right */}
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
        backgroundColor={colors.transport.flight.success}
        textColor={colors.text.inverse}
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  locationSection: {
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
  flightPath: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    flex: 1,
    justifyContent: 'center',
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderTopWidth: 1,
    borderTopColor: colors.border.normal,
    borderStyle: 'dashed',
  },
  pathCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.text.secondary,
    marginHorizontal: spacing.xs,
  },
  airlineLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.transport.flight.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  airlineLogoText: {
    ...typography.styles.bodyBold12,
    color: colors.text.inverse,
    textAlign: 'center',
  },
  timesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  time: {
    ...typography.styles.bodyBold18,
    color: colors.text.primary,
  },
  spacer: {
    flex: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
    flexWrap: 'wrap',
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
  nonStopText: {
    color: colors.transport.flight.primary,
  },
  priceText: {
    ...typography.styles.bodyBold18,
    color: colors.transport.flight.primary,
    marginLeft: 'auto',
  },
  reserveButton: {
    backgroundColor: colors.transport.flight.success,
  },
});

