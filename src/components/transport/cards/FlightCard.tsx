/**
 * FlightCard Component
 * Card displaying flight offer with all details
 * Redesigned to match Figma layout: centered container with two columns
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Image,
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
      {/* Main Row: Column 1 (towns + times) and Column 2 (airline) */}
      <View style={styles.mainRow}>
        {/* Column 1: Towns and Times */}
        <View style={styles.column1}>
          {/* Row 1: Towns with icons (no connector between them) */}
          <View style={styles.townsRow}>
            {/* Left: Origin with takeoff icon */}
            <View style={styles.townLeft}>
              <View style={styles.townItem}>
                <Icon 
                  name="airplane-takeoff" 
                  size={20} 
                  color={colors.yellow.normal} 
                  family="materialcommunity" 
                />
                <Text style={styles.townText}>{offer.origin}</Text>
              </View>
            </View>

            {/* Empty space in the middle for towns row */}

            {/* Right: Destination with landing icon */}
            <View style={styles.townRight}>
              <View style={styles.townItem}>
                <Icon 
                  name="airplane-landing" 
                  size={20} 
                  color={colors.yellow.normal} 
                  family="materialcommunity" 
                />
                <Text style={styles.townText}>{offer.destination}</Text>
              </View>
            </View>
          </View>

          <View style={styles.timesRow}>
            <View style={styles.timeLeft}>
              <Text style={styles.time}>{offer.departureTime}</Text>
            </View>

            <View style={styles.timeConnector}>
              <View style={styles.singleDot} />
              
              <View style={styles.dashedLineSection}>
                {Array.from({ length: 35 }).map((_, index) => (
                  <View key={index} style={styles.dashDot} />
                ))}
              </View>
              
              {/* Plane icon close to second dot */}
              <View style={styles.planeIconContainer}>
                <Icon
                  name="airplane"
                  size={16}
                  color={colors.text.secondary}
                  family="ionicons"
                />
              </View>
              
              {/* Second dot before end time */}
              <View style={styles.singleDot} />
            </View>

            {/* Right: Arrival Time */}
            <View style={styles.timeRight}>
              <Text style={[styles.time, styles.timeEnd]}>{offer.arrivalTime}</Text>
            </View>
          </View>
        </View>

        {/* Column 2: Airline (centered) */}
        {offer.airline && (
          <View style={styles.column2}>
            <View style={styles.airlineContainer}>
              {offer.airlineLogo ? (
                <Image 
                  source={{ uri: offer.airlineLogo }} 
                  style={styles.airlineLogoImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={[styles.airlineLogoCircle, { backgroundColor: colors.transport.flight.primary }]}>
                  <Text style={styles.airlineLogoText}>
                    {offer.airline.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)}
                  </Text>
                </View>
              )}
              <View style={styles.airlineNameContainer}>
                {offer.airline.split(' ').map((word, index) => (
                  <Text key={index} style={styles.airlineName}>{word}</Text>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Row 3: Duration, Type (Non stop), Number of people, Price */}
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

      {/* Row 4: Reserve Button */}
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
    backgroundColor: colors.transport.flight.card, // #F7F7FA
    borderRadius: 12,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.transport.flight.border,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  column1: {
    flex: 1,
  },
  column2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
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
  townText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
  time: {
    ...typography.styles.bodyBold18,
    color: colors.text.primary,
  },
  timeEnd: {
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  timeConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
    flex: 1,
    minWidth: 0,
  },
  dashedLineSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dashDot: {
    width: 3,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.text.secondary,
    marginHorizontal: 1,
  },
  singleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.text.secondary,
    marginHorizontal: 2,
  },
  planeIconContainer: {
    marginHorizontal: 0,
  },
  airlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  airlineLogoCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  airlineLogoImage: {
    width: 20,
    height: 20,
    marginRight: spacing.xs,
  },
  airlineNameContainer: {
    alignItems: 'flex-start',
  },
  airlineLogoText: {
    ...typography.styles.bodyBold12,
    color: colors.text.inverse,
    textAlign: 'center',
    fontSize: 10,
  },
  airlineName: {
    ...typography.styles.bodyRegular12,
    color: colors.transport.flight.primary,
    textAlign: 'center',
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
    textDecorationLine: 'underline',
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
