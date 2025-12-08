/**
 * TrainBookingScreen
 * Train booking form with passenger selection, baggage, class, and payment
 * Same structure as FlightBookingScreen but with gold theme
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
  SeatSelection,
  BaggageSelection,
  PaymentTypeSelector,
  CardInputFields,
  type SeatType,
  type BaggageType,
  type PaymentType,
  type CardInputFieldsData,
} from '../../../components/transport';
import {
  PersonalInfoForm,
  type PersonalInfoFormData,
} from '../../../components/transport/forms/PersonalInfoForm';
import { colors, spacing, typography } from '../../../theme';
import { useHideTabBar } from '../../../hooks';
import { Icon } from '../../../components/common/icons/Icon';
import type {
  TransportOffer,
  PassengerCount,
  BaggageItem,
  TransportClass,
} from '../../../types/transport';

interface TrainBookingScreenParams {
  offerId: string;
  offer: TransportOffer;
}

type TrainBookingScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'TrainBooking'
>;

export const TrainBookingScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<TrainBookingScreenNavigationProp>();
  const params = route.params as TrainBookingScreenParams;

  // Hide tab bar when this screen is focused
  useHideTabBar();

  const offer = params.offer;

  // Form state
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 0,
    babies: 0,
  });
  const [baggage, setBaggage] = useState<BaggageItem[]>([
    { id: 'baggage-1', weight: 1 },
  ]);
  const [selectedClass, setSelectedClass] = useState<TransportClass>('standard');
  const [selectedSeat, setSelectedSeat] = useState<SeatType | null>(null);
  const [selectedBaggageTypes, setSelectedBaggageTypes] = useState<BaggageType[]>([]);
  const [paymentType, setPaymentType] = useState<PaymentType>('standard');
  const [cardData, setCardData] = useState<CardInputFieldsData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormData>({
    nom: '',
    prenom: '',
    dateNaissance: '',
    typeDocument: 'passport',
    numeroDocument: '',
    dateExpiration: '',
    paysEmission: '',
    nationalite: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('Mastercard **** 1234');

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePay = () => {
    // Validate form before proceeding
    if (!personalInfo.nom || !personalInfo.prenom || !cardData.cardNumber || !cardData.cvv) {
      // TODO: Show validation error
      return;
    }

    // Navigate to payment screen
    navigation.navigate('Payment', {
      bookingDetails: {
        offerId: offer.id,
        type: offer.type,
        origin: offer.origin,
        destination: offer.destination,
        date: '10-11-2025',
        departureTime: offer.departureTime,
        arrivalTime: offer.arrivalTime,
        duration: offer.duration,
        trainCompany: offer.trainCompany,
        passengers,
        baggage,
        class: selectedClass,
        seat: selectedSeat,
        baggageTypes: selectedBaggageTypes,
        paymentType,
        cardData,
        personalInfo,
        basePrice: offer.price,
        baggagePrice: baggage.length * 20,
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
    <ScreenBackground backgroundColor={colors.transport.train.background}>
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
        {/* Train Details Card */}
        <View style={styles.trainDetailsCard}>
          <View style={styles.dateRow}>
            <Text style={styles.dateText}>Date: 10-11-2026</Text>
          </View>

          <View style={styles.routeRow}>
            <View style={styles.locationBox}>
              <Icon name="location" size={16} color={colors.transport.train.primary} family="ionicons" />
              <Text style={styles.locationText}>{offer.origin}</Text>
            </View>

            <View style={styles.connectionLine}>
              <View style={styles.dashedLine} />
              <Icon
                name="train"
                size={24}
                color={colors.transport.train.primary}
                family="ionicons"
              />
              <View style={styles.dashedLine} />
            </View>

            <View style={styles.locationBox}>
              <Icon name="location" size={16} color={colors.transport.train.primary} family="ionicons" />
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
                {offer.stops.length} transfer
              </Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>
              {offer.passengersIncluded} personnes
            </Text>
            <Text style={styles.priceText}>
              {formatPrice(offer.price, offer.currency)}
            </Text>
          </View>
        </View>

        {/* Personal Information Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations personnelles</Text>
          <PersonalInfoForm
            data={personalInfo}
            onChange={setPersonalInfo}
            primaryColor={colors.transport.train.primary}
          />
        </View>

        {/* Travelers Count */}
        <View style={styles.section}>
          <PassengerSelector
            passengers={passengers}
            onChange={setPassengers}
            title="Qui viens avec vous?"
          />
        </View>

        {/* Seat Selection */}
        <View style={styles.section}>
          <SeatSelection
            selectedSeat={selectedSeat}
            onSeatChange={setSelectedSeat}
            primaryColor={colors.transport.train.primary}
          />
        </View>

        {/* Baggage Selection */}
        <View style={styles.section}>
          <BaggageSelection
            selectedBaggage={selectedBaggageTypes}
            onBaggageChange={setSelectedBaggageTypes}
            primaryColor={colors.transport.train.primary}
          />
        </View>

        {/* Class Selection */}
        <View style={styles.section}>
          <ClassSelector
            selectedClass={selectedClass}
            onClassChange={setSelectedClass}
          />
        </View>

        {/* Payment Type Selection */}
        <View style={styles.section}>
          <PaymentTypeSelector
            selectedType={paymentType}
            onTypeChange={setPaymentType}
            primaryColor={colors.transport.train.primary}
          />
        </View>

        {/* Card Input Fields */}
        <View style={styles.section}>
          <CardInputFields
            data={cardData}
            onChange={setCardData}
            primaryColor={colors.transport.train.primary}
          />
        </View>

        {/* Payment Method Selection (Saved Cards) */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Carte enregistrée</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'Mastercard **** 1234' && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod('Mastercard **** 1234')}
            activeOpacity={0.7}
          >
            <Text style={styles.paymentText}>Mastercard **** 1234</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'Visa **** 4667' && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod('Visa **** 4667')}
            activeOpacity={0.7}
          >
            <Text style={styles.paymentText}>Visa **** 4667</Text>
          </TouchableOpacity>
        </View>

        {/* Validate Button */}
        <Button
          title="Valider"
          onPress={handlePay}
          variant="primary"
          size="large"
          fullWidth
          style={[styles.validateButton, { backgroundColor: colors.transport.train.primary }]}
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
  trainDetailsCard: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  dateRow: {
    marginBottom: spacing.md,
  },
  dateText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  summaryText: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
  },
  priceText: {
    ...typography.styles.bodyBold20,
    color: colors.transport.train.primary,
  },
  passengerInfoSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.styles.inputLabel,
    color: colors.text.primary,
    marginTop: spacing.base,
    marginBottom: spacing.xs,
  },
  passengerName: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
  documentType: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
  documentId: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
  expirationDate: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
  paymentSection: {
    marginBottom: spacing.lg,
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
    borderColor: colors.transport.train.primary,
    backgroundColor: colors.transport.train.card,
  },
  paymentText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
  validateButton: {
    marginTop: spacing.base,
  },
  section: {
    marginBottom: spacing.lg,
  },
});

