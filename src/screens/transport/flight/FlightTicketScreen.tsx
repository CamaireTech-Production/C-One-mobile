/**
 * FlightTicketScreen
 * Displays flight ticket with all details and barcode
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
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
import { TicketCard } from '../../../components/transport';
import { colors, spacing, typography } from '../../../theme';
import { useHideTabBar } from '../../../hooks';
import { Icon } from '../../../components/common/icons/Icon';
import type { TransportTicket } from '../../../types/transport';

interface FlightTicketScreenParams {
  ticketId: string;
  ticket: TransportTicket;
}

type FlightTicketScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'FlightTicket'
>;

// Mock ticket data - will be replaced with real data from booking
const createMockTicket = (): TransportTicket => ({
  id: 'ticket-1',
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
  terminal: 'Terminal 1',
  gate: 'Gate A12',
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
});

export const FlightTicketScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<FlightTicketScreenNavigationProp>();
  const params = route.params as FlightTicketScreenParams;

  // Hide tab bar when this screen is focused
  useHideTabBar();

  const ticket = params.ticket || createMockTicket();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDownload = () => {
    // TODO: In production, implement actual file download using expo-file-system and expo-sharing
    // For now, show success message
    Alert.alert(
      t('transport.ticket.downloadSuccess') || 'Téléchargement réussi',
      t('transport.ticket.downloadMessage') || 'Votre ticket a été téléchargé avec succès.',
      [
        {
          text: t('transport.common.ok') || 'OK',
          style: 'default',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScreenBackground backgroundColor={colors.transport.flight.background}>
      <DetailHeader
        title={`${ticket.originCode || ticket.origin.substring(0, 3).toUpperCase()} ${ticket.destinationCode || ticket.destination.substring(0, 3).toUpperCase()}`}
        onBack={handleBack}
        rightIconName="close"
        rightIconFamily="ionicons"
        onRightIconPress={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TicketCard ticket={ticket} variant="flight" />

        <Button
          title="Télécharger le ticket"
          onPress={handleDownload}
          variant="primary"
          size="large"
          fullWidth
          style={styles.downloadButton}
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
  downloadButton: {
    marginTop: spacing.lg,
  },
});

