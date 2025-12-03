/**
 * BookingConfirmationScreen
 * Success modal with checkmark, preview tickets, button to view
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types';

import {
  ScreenBackground,
  SuccessModal,
  Button,
} from '../../components/common';
import { TicketCard } from '../../components/transport';
import { colors, spacing, typography } from '../../theme';
import type { TransportTicket } from '../../types/transport';

interface BookingConfirmationScreenParams {
  bookingId: string;
  type: 'plane' | 'train';
}

type BookingConfirmationScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'BookingConfirmation'
>;

// Mock ticket data
const createMockTicket = (type: 'plane' | 'train'): TransportTicket => {
  if (type === 'plane') {
    return {
      id: 'ticket-flight-1',
      bookingId: 'booking-1',
      type: 'plane',
      passengerName: 'NOMICOPLAN',
      documentType: 'passport',
      documentId: 'AIE0005',
      origin: 'Quebec',
      originCode: 'QBC',
      destination: 'New York',
      destinationCode: 'NYK',
      departureDate: '10-11-2025',
      arrivalDate: '10-11-2025',
      departureTime: '12:20',
      arrivalTime: '14:17',
      duration: '2h 30min',
      seat: '2',
      numberOfSeats: 1,
      baggage: 1,
      totalWeight: '40kg',
      class: 'standard',
      paymentMethod: 'VISA **** 1234',
      totalAmount: 450,
      currency: '$',
      paymentDate: '13 JUIL. 2024',
      barcode: '1234567890123',
      airline: 'IndiGo',
    };
  } else {
    return {
      id: 'ticket-train-1',
      bookingId: 'booking-train-1',
      type: 'train',
      passengerName: 'Nyadjou Danielle',
      documentType: 'passport',
      documentId: 'AB12006',
      origin: 'Quebec',
      originCode: 'QBC',
      destination: 'Ontario',
      destinationCode: 'OTR',
      departureDate: '10-11-2025',
      arrivalDate: '10-11-0005',
      departureTime: '12:20',
      arrivalTime: '18:10',
      duration: '6h 20m',
      numberOfSeats: 2,
      baggage: 1,
      totalWeight: '40kg',
      class: 'standard',
      paymentMethod: '**** 1234',
      totalAmount: 450,
      currency: '$',
      paymentDate: '13-11-17',
      barcode: '1234869405645920',
      trainCompany: 'VIA Rail',
    };
  }
};

export const BookingConfirmationScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<BookingConfirmationScreenNavigationProp>();
  const params = route.params as BookingConfirmationScreenParams;

  const [showSuccessModal, setShowSuccessModal] = useState(true);
  const ticket = createMockTicket(params.type);

  const handleViewTicket = () => {
    setShowSuccessModal(false);
    // Navigate to ticket screen
    if (params.type === 'plane') {
      navigation.navigate('FlightTicket', {
        ticketId: ticket.id,
        ticket,
      });
    } else {
      navigation.navigate('TrainTicket', {
        ticketId: ticket.id,
        ticket,
      });
    }
  };

  const handleGoHome = () => {
    setShowSuccessModal(false);
    navigation.navigate('HomeMain');
  };

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <SuccessModal
        visible={showSuccessModal}
        message="Votre réservation a été confirmée avec succès!"
        primaryButtonLabel="Consulter"
        secondaryButtonLabel="Retour à l'accueil"
        onPrimaryPress={handleViewTicket}
        onSecondaryPress={handleGoHome}
        onClose={handleGoHome}
      />

      {/* Preview Ticket (shown when modal is closed) */}
      {!showSuccessModal && (
        <View style={styles.container}>
          <View style={styles.ticketPreview}>
            <Text style={styles.previewTitle}>Aperçu du ticket</Text>
            <TicketCard ticket={ticket} variant={params.type} />
            <Button
              title="Voir le ticket complet"
              onPress={handleViewTicket}
              variant="primary"
              size="large"
              fullWidth
              style={styles.viewButton}
            />
          </View>
        </View>
      )}
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.base,
  },
  ticketPreview: {
    marginTop: spacing.xl,
  },
  previewTitle: {
    ...typography.styles.h3,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  viewButton: {
    marginTop: spacing.lg,
  },
});

