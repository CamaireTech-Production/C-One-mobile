/**
 * FlightBookingScreen
 * Flight booking form with passenger selection, baggage, class, and payment
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../../types';

import {
  ScreenBackground,
  DetailHeader,
  Button,
} from '../../../components/common';
import {
  PassengerSelector,
  BaggageSelector,
  ClassSelector,
} from '../../../components/transport';
import { colors, spacing, typography } from '../../../theme';
import { useHideTabBar } from '../../../hooks';
import { Icon } from '../../../components/common/icons/Icon';
import type {
  TransportOffer,
  PassengerCount,
  BaggageItem,
  TransportClass,
} from '../../../types/transport';

interface FlightBookingScreenParams {
  offerId: string;
  offer: TransportOffer;
}

type FlightBookingScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'FlightBooking'
>;

export const FlightBookingScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<FlightBookingScreenNavigationProp>();
  const params = route.params as FlightBookingScreenParams;

  // Hide tab bar when this screen is focused
  useHideTabBar();

  const offer = params.offer;

  // Form state
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 1,
    babies: 0,
  });
  const [baggage, setBaggage] = useState<BaggageItem[]>([
    { id: 'baggage-1', weight: 1 },
    { id: 'baggage-2', weight: 1 },
  ]);
  const [selectedClass, setSelectedClass] = useState<TransportClass>('standard');
  const [paymentMethod, setPaymentMethod] = useState<string>('VISA **** 1234');

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePay = () => {
    // Navigate to payment screen
    navigation.navigate('Payment', {
      bookingDetails: {
        offerId: offer.id,
        type: offer.type,
        origin: offer.origin,
        destination: offer.destination,
        date: '10-11-2025', // Should come from search
        departureTime: offer.departureTime,
        arrivalTime: offer.arrivalTime,
        duration: offer.duration,
        airline: offer.airline,
        passengers,
        baggage,
        class: selectedClass,
        basePrice: offer.price,
        baggagePrice: baggage.length * 20, // Mock calculation
        classPrice: selectedClass === 'vip' ? 100 : 0,
        totalPrice: offer.price + (baggage.length * 20) + (selectedClass === 'vip' ? 100 : 0),
        currency: offer.currency,
      },
    });
  };

  const formatPrice = (price: number, currency: string) => {
    return `${price}${currency}`;
  };

  return (
    <ScreenBackground backgroundColor={colors.transport.flight.background}>
      <DetailHeader
        title="Réservation"
        onBack={handleBack}
        rightIconName="person-outline"
        rightIconFamily="ionicons"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Flight Details Card */}
        <View style={styles.flightDetailsCard}>
          <View style={styles.dateRow}>
            <Text style={styles.dateText}>Date: 10-11-2025</Text>
            {offer.airline && (
              <Text style={styles.airlineText}>{offer.airline}</Text>
            )}
          </View>

          <View style={styles.routeRow}>
            <View style={styles.locationBox}>
              <Icon name="location" size={16} color={colors.transport.flight.primary} family="ionicons" />
              <Text style={styles.locationText}>{offer.origin}</Text>
            </View>

            <View style={styles.connectionLine}>
              <View style={styles.dashedLine} />
              <Icon
                name="airplane"
                size={24}
                color={colors.transport.flight.primary}
                family="ionicons"
              />
              <View style={styles.dashedLine} />
            </View>

            <View style={styles.locationBox}>
              <Icon name="location" size={16} color={colors.transport.flight.primary} family="ionicons" />
              <Text style={styles.locationText}>{offer.destination}</Text>
            </View>
          </View>

          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{offer.departureTime}</Text>
            <View style={styles.timeDetails}>
              <Icon name="time-outline" size={16} color={colors.text.secondary} family="ionicons" />
              <Text style={styles.durationText}>{offer.duration}</Text>
            </View>
            <Text style={styles.timeText}>{offer.arrivalTime}</Text>
          </View>

          {offer.stops && offer.stops.length > 0 && (
            <View style={styles.stopsInfo}>
              <Text style={styles.stopsText}>
                {offer.stops.length} escales
              </Text>
            </View>
          )}

          <View style={styles.priceRow}>
            <Text style={styles.priceText}>
              {formatPrice(offer.price, offer.currency)}
            </Text>
          </View>
        </View>

        {/* Passenger Selection */}
        <PassengerSelector
          passengers={passengers}
          onChange={setPassengers}
          title="Qui veut vous voir?"
        />

        {/* Baggage Selection */}
        <BaggageSelector
          baggage={baggage}
          onChange={setBaggage}
        />

        {/* Class Selection */}
        <ClassSelector
          selectedClass={selectedClass}
          onClassChange={setSelectedClass}
        />

        {/* Payment Method Selection */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Mode de paiement</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'VISA **** 1234' && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod('VISA **** 1234')}
            activeOpacity={0.7}
          >
            <Text style={styles.paymentText}>VISA **** 1234</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'VISA **** 4567' && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod('VISA **** 4567')}
            activeOpacity={0.7}
          >
            <Text style={styles.paymentText}>VISA **** 4567</Text>
          </TouchableOpacity>
        </View>

        {/* Pay Button */}
        <Button
          title="Payer"
          onPress={handlePay}
          variant="primary"
          size="large"
          fullWidth
          style={styles.payButton}
        />
      </ScrollView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.base,
    paddingBottom: spacing['4xl'],
  },
  flightDetailsCard: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  dateText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
  },
  airlineText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.secondary,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
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
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  timeText: {
    ...typography.styles.bodyBold18,
    color: colors.text.primary,
  },
  timeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  durationText: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
  },
  stopsInfo: {
    marginBottom: spacing.sm,
  },
  stopsText: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
  },
  priceRow: {
    alignItems: 'flex-end',
    marginTop: spacing.sm,
  },
  priceText: {
    ...typography.styles.bodyBold20,
    color: colors.transport.flight.primary,
  },
  paymentSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
    marginBottom: spacing.base,
  },
  paymentOption: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.normal,
    marginBottom: spacing.sm,
  },
  paymentOptionSelected: {
    borderColor: colors.primary.normal,
    backgroundColor: colors.primary.light,
  },
  paymentText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
  payButton: {
    marginTop: spacing.base,
  },
});

