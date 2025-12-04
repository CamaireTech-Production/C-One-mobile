/**
 * TransportCard Component
 * General reusable card component for displaying transport offers (flights and trains)
 * Supports both flight and train data with appropriate icons and styling
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

interface TransportCardProps {
  offer: TransportOffer;
  onPress?: () => void;
  onReserve?: () => void;
  style?: ViewStyle;
}

export const TransportCard: React.FC<TransportCardProps> = ({
  offer,
  onPress,
  onReserve,
  style,
}) => {
  const { t } = useTranslation();
  
  const formatPrice = (price: number, currency: string) => {
    return `${price}${currency}`;
  };

  const isFlight = offer.type === 'plane';
  const theme = isFlight ? colors.transport.flight : colors.transport.train;
  
  // Get provider name (airline for flights, trainCompany for trains)
  const providerName = isFlight ? offer.airline : offer.trainCompany;
  
  // Get initials for provider logo
  const getProviderInitials = (name?: string) => {
    if (!name) return '';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Get icon names based on transport type
  const originIcon = isFlight ? 'airplane-takeoff' : 'train';
  const destinationIcon = isFlight ? 'airplane-landing' : 'train';
  const connectorIcon = isFlight ? 'airplane' : 'train';
  const originIconFamily = isFlight ? 'materialcommunity' : 'ionicons';
  const destinationIconFamily = isFlight ? 'materialcommunity' : 'ionicons';
  const connectorIconFamily = isFlight ? 'ionicons' : 'ionicons';

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }, style]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Main Row: Column 1 (towns + times) and Column 2 (provider - only for flights) */}
      <View style={styles.mainRow}>
        {/* Column 1: Towns and Times */}
        <View style={styles.column1}>
          {/* Row 1: Towns with icons (no connector between them) */}
          <View style={styles.townsRow}>
            {/* Left: Origin with icon */}
            <View style={styles.townLeft}>
              <View style={styles.townItem}>
                <View style={[styles.townIconContainer, { backgroundColor: colors.yellow.normal }]}>
                  <Icon 
                    name={originIcon} 
                    size={16} 
                    color={colors.text.inverse} 
                    family={originIconFamily}
                  />
                </View>
                <Text style={styles.townText}>{offer.origin}</Text>
              </View>
            </View>

            {/* Empty space in the middle for towns row */}

            {/* Right: Destination with icon */}
            <View style={styles.townRight}>
              <View style={styles.townItem}>
                <View style={[styles.townIconContainer, { backgroundColor: colors.yellow.normal }]}>
                  <Icon 
                    name={destinationIcon} 
                    size={16} 
                    color={colors.text.inverse} 
                    family={destinationIconFamily}
                  />
                </View>
                <Text style={styles.townText}>{offer.destination}</Text>
              </View>
            </View>
          </View>

          <View style={styles.timesRow}>
            <View style={styles.timeLeft}>
              <Text style={[styles.time, { color: colors.text.timeText }]}>{offer.departureTime}</Text>
            </View>

            <View style={styles.timeConnector}>
              <View style={[styles.singleDot, { backgroundColor: theme.connector || colors.transport.flight.connector }]} />
              
              {/* Left dashed line section - adapts to screen */}
              <View style={[styles.dashedLineLeft, { borderTopColor: theme.connector || colors.transport.flight.connector }]} />
              
              {/* Transport icon close to second dot */}
              <View style={styles.transportIconContainer}>
                <Icon
                  name={connectorIcon}
                  size={16}
                  color={theme.connector || colors.transport.flight.connector}
                  family={connectorIconFamily}
                />
              </View>
              
              {/* Second dot before end time */}
              <View style={[styles.singleDot, { backgroundColor: theme.connector || colors.transport.flight.connector }]} />
            </View>

            {/* Right: Arrival Time */}
            <View style={styles.timeRight}>
              <Text style={[styles.time, styles.timeEnd, { color: colors.text.timeText }]}>{offer.arrivalTime}</Text>
            </View>
          </View>
        </View>

        {/* Column 2: Provider (airline for flights only) */}
        {isFlight && providerName && (
          <View style={styles.column2}>
            <View style={styles.providerContainer}>
              <View style={[styles.providerLogoCircle, { backgroundColor: theme.primary }]}>
                <Text style={styles.providerLogoText}>
                  {getProviderInitials(providerName)}
                </Text>
              </View>
              <View style={styles.providerNameContainer}>
                {providerName.split(' ').map((word, index) => (
                  <Text key={index} style={[styles.providerName, { color: colors.text.airlineName }]}>{word}</Text>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Row 3: Duration, Type (Non stop), Number of people, Price */}
      <View style={styles.detailsRow}>
        <View style={styles.detailItemWrapper}>
          <View style={styles.detailItem}>
            <Icon name="time-outline" size={16} color={theme.primary} family="ionicons" />
            <Text style={styles.detailText}>{offer.duration}</Text>
          </View>
        </View>

        <View style={styles.detailItemWrapper}>
          <Text style={[styles.detailText, styles.nonStopText, { color: theme.primary, borderBottomColor: theme.primary }]}>
            {offer.isNonStop 
              ? (isFlight ? 'Non stop' : 'Direct') 
              : `${offer.numberOfStops || offer.stops?.length || 0} ${isFlight ? 'escales' : 'transfer'}`}
          </Text>
        </View>

        <View style={styles.detailItemWrapper}>
          <Text style={styles.detailText}>
            {offer.passengersIncluded} Personnes
          </Text>
        </View>

        <View style={styles.detailItemWrapper}>
          <Text style={[styles.priceText, { color: theme.primary }]}>
            {formatPrice(offer.price, offer.currency)}
          </Text>
        </View>
      </View>

      {/* Row 4: Reserve Button */}
      <Button
        title={t('transport.common.reserve')}
        onPress={onReserve || onPress || (() => {})}
        variant="primary"
        size="medium"
        fullWidth
        style={[styles.reserveButton, { backgroundColor: isFlight ? theme.buttonGreen : theme.success }]}
        backgroundColor={isFlight ? theme.buttonGreen : theme.success}
        textColor={colors.text.inverse}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderWidth: 1,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  column1: {
    width: '70%', // Column 1 takes 70% of the width
  },
  column2: {
    width: '30%', // Column 2 takes 30% of the width
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
  townIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  townText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.destinationTown,
  },
  time: {
    ...typography.styles.bodyBold18,
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
  dashedLineLeft: {
    flex: 1,
    height: 1,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    alignSelf: 'center',
  },
  singleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  transportIconContainer: {
    marginHorizontal: 0,
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerLogoCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  providerNameContainer: {
    alignItems: 'flex-start',
  },
  providerLogoText: {
    ...typography.styles.bodyBold12,
    color: colors.text.inverse,
    textAlign: 'center',
    fontSize: 10,
  },
  providerName: {
    ...typography.styles.bodyRegular14,
    textAlign: 'center',
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
  detailText: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
  },
  nonStopText: {
    borderBottomWidth: 1,
  },
  priceText: {
    ...typography.styles.bodySemibold24,
    marginLeft: 'auto',
  },
  reserveButton: {
    // backgroundColor will be set dynamically
  },
});

