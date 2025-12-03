/**
 * TicketCard Component
 * Displays transport ticket with all details and barcode
 * Variants: flight (white) / train (gold)
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Image } from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { BarcodeDisplay } from './BarcodeDisplay';
import type { TransportTicket } from '../../../types/transport';

export type TicketVariant = 'flight' | 'train';

interface TicketCardProps {
  ticket: TransportTicket;
  variant?: TicketVariant;
  style?: ViewStyle;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  variant = 'flight',
  style,
}) => {
  const theme = variant === 'flight' ? colors.transport.flight : colors.transport.train;

  return (
    <View style={[styles.container, { backgroundColor: theme.card }, style]}>
      {/* Route Header */}
      <View style={[styles.routeHeader, { backgroundColor: theme.primary }]}>
        <Text style={styles.routeCode}>{ticket.originCode || ticket.origin.substring(0, 3).toUpperCase()}</Text>
        <Text style={styles.routeCode}>{ticket.destinationCode || ticket.destination.substring(0, 3).toUpperCase()}</Text>
      </View>

      {/* Brand Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>C-One</Text>
        {variant === 'train' && (
          <Text style={styles.tagline}>Your journey, Our priority</Text>
        )}
      </View>

      {/* Ticket Details - Two Columns */}
      <View style={styles.detailsContainer}>
        <View style={styles.column}>
          <Text style={styles.label}>NOM COMPLET</Text>
          <Text style={styles.value}>{ticket.passengerName}</Text>

          <Text style={styles.label}>DATE DE DÉPART</Text>
          <Text style={styles.value}>{ticket.departureDate}</Text>

          <Text style={styles.label}>HEURES</Text>
          <Text style={styles.value}>{ticket.departureTime} - {ticket.arrivalTime}</Text>

          {ticket.type === 'plane' && ticket.seat && (
            <>
              <Text style={styles.label}>PLACE</Text>
              <Text style={styles.value}>{ticket.seat}</Text>
            </>
          )}

          {ticket.type === 'train' && (
            <>
              <Text style={styles.label}>NOMBRES DE PLACE</Text>
              <Text style={styles.value}>{ticket.numberOfSeats}</Text>
            </>
          )}

          <Text style={styles.label}>MODE DE PAIEMENT</Text>
          <Text style={styles.value}>{ticket.paymentMethod}</Text>

          <Text style={styles.label}>DATE DE PAIEMENT</Text>
          <Text style={styles.value}>{ticket.paymentDate}</Text>
        </View>

        <View style={styles.column}>
          {ticket.type === 'plane' && (
            <>
              <Text style={styles.label}>N° D'AÉROPORT</Text>
              <Text style={styles.value}>{ticket.documentId}</Text>
            </>
          )}

          {ticket.type === 'train' && (
            <>
              <Text style={styles.label}>N ID/PASSPORT</Text>
              <Text style={styles.value}>{ticket.documentId}</Text>
            </>
          )}

          <Text style={styles.label}>DATE D'ARRIVÉE</Text>
          <Text style={styles.value}>{ticket.arrivalDate}</Text>

          <Text style={styles.label}>FORMULE</Text>
          <Text style={styles.value}>
            {ticket.class === 'standard' ? 'Standard / économique' : 'VIP / première classe'}
          </Text>

          <Text style={styles.label}>BAGAGES</Text>
          <Text style={styles.value}>{ticket.baggage}</Text>

          <Text style={styles.label}>POIDS TOTAL</Text>
          <Text style={styles.value}>{ticket.totalWeight}</Text>

          <Text style={styles.label}>MONTANT TOTAL</Text>
          <Text style={[styles.value, styles.priceValue]}>
            {ticket.currency}{ticket.totalAmount}
          </Text>
        </View>
      </View>

      {/* Airline/Train Company Logo */}
      {(ticket.airline || ticket.trainCompany) && (
        <View style={styles.companyContainer}>
          <Text style={styles.companyText}>
            {ticket.airline || ticket.trainCompany}
          </Text>
        </View>
      )}

      {/* Barcode */}
      <BarcodeDisplay barcode={ticket.barcode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.base,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderRadius: 8,
    marginBottom: spacing.base,
  },
  routeCode: {
    ...typography.styles.bodyBold20,
    color: colors.text.inverse,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoText: {
    ...typography.styles.h3,
    color: colors.text.primary,
  },
  tagline: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.base,
  },
  column: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  label: {
    ...typography.styles.bodyRegular12,
    color: colors.text.secondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs / 2,
  },
  value: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
  },
  priceValue: {
    ...typography.styles.bodyBold18,
    color: colors.primary.normal,
  },
  companyContainer: {
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  companyText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
  },
});

