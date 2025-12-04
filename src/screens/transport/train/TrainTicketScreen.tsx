/**
 * TrainTicketScreen
 * Displays train ticket with all details and barcode
 * Gold theme design
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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
import type { TransportTicket } from '../../../types/transport';

interface TrainTicketScreenParams {
  ticketId: string;
  ticket: TransportTicket;
}

type TrainTicketScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'TrainTicket'
>;

// Mock ticket data
const createMockTicket = (): TransportTicket => ({
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
});

export const TrainTicketScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<TrainTicketScreenNavigationProp>();
  const params = route.params as TrainTicketScreenParams;

  // Hide tab bar when this screen is focused
  useHideTabBar();

  const ticket = params.ticket || createMockTicket();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDownload = () => {
    // TODO: Implement ticket download
    console.log('Download ticket');
  };

  return (
    <ScreenBackground backgroundColor={colors.transport.train.background}>
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
        <TicketCard ticket={ticket} variant="train" />

        <Button
          title="Télécharger le ticket"
          onPress={handleDownload}
          variant="primary"
          size="large"
          fullWidth
          style={[styles.downloadButton, { backgroundColor: colors.transport.train.primary }]}
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

