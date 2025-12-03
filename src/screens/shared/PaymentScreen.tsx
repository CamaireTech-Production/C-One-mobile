/**
 * PaymentScreen
 * Payment method selection, card fields, billing address
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
import type { HomeStackParamList } from '../../types';

import {
  ScreenBackground,
  DetailHeader,
  Button,
  Input,
} from '../../components/common';
import { colors, spacing, typography } from '../../theme';
import { Icon } from '../../components/common/icons/Icon';

interface PaymentScreenParams {
  bookingDetails: any;
  personalInfo?: any;
}

type PaymentScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Payment'
>;

export const PaymentScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<PaymentScreenNavigationProp>();
  const params = route.params as PaymentScreenParams;

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [billingAddress, setBillingAddress] = useState<string>('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePay = () => {
    // Navigate to password screen for payment confirmation
    navigation.navigate('Password', {
      purpose: 'payment',
      onSuccess: () => {
        // After password confirmation, navigate to booking confirmation
        const bookingType = params.bookingDetails?.type || 'plane';
        navigation.navigate('BookingConfirmation', {
          bookingId: `booking-${Date.now()}`,
          type: bookingType === 'plane' ? 'plane' : 'train',
        });
      },
    });
  };

  const formatPrice = (price: number, currency: string) => {
    return `${price}${currency}`;
  };

  const totalPrice = params.bookingDetails?.totalPrice || params.bookingDetails?.basePrice || 0;
  const currency = params.bookingDetails?.currency || '$';

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <DetailHeader
        title="Paiement"
        onBack={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Booking Summary */}
        {params.bookingDetails && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Résumé de la réservation</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Origine</Text>
              <Text style={styles.summaryValue}>
                {params.bookingDetails.origin}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Destination</Text>
              <Text style={styles.summaryValue}>
                {params.bookingDetails.destination}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>
                {params.bookingDetails.date}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryTotal}>
                {formatPrice(totalPrice, currency)}
              </Text>
            </View>
          </View>
        )}

        {/* Payment Method Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Méthode de paiement</Text>

          <TouchableOpacity
            style={[
              styles.paymentMethodOption,
              paymentMethod === 'card' && styles.paymentMethodSelected,
            ]}
            onPress={() => setPaymentMethod('card')}
            activeOpacity={0.7}
          >
            <Icon
              name="card-outline"
              size={24}
              color={paymentMethod === 'card' ? colors.primary.normal : colors.text.secondary}
              family="ionicons"
            />
            <Text
              style={[
                styles.paymentMethodText,
                paymentMethod === 'card' && styles.paymentMethodTextSelected,
              ]}
            >
              Carte bancaire
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentMethodOption,
              paymentMethod === 'paypal' && styles.paymentMethodSelected,
            ]}
            onPress={() => setPaymentMethod('paypal')}
            activeOpacity={0.7}
          >
            <Icon
              name="wallet-outline"
              size={24}
              color={paymentMethod === 'paypal' ? colors.primary.normal : colors.text.secondary}
              family="ionicons"
            />
            <Text
              style={[
                styles.paymentMethodText,
                paymentMethod === 'paypal' && styles.paymentMethodTextSelected,
              ]}
            >
              PayPal
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card Details */}
        {paymentMethod === 'card' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Détails de la carte</Text>

            <Input
              label="Numéro de carte"
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              containerStyle={styles.inputContainer}
            />

            <Input
              label="Titulaire de la carte"
              value={cardHolder}
              onChangeText={setCardHolder}
              placeholder="Nom sur la carte"
              containerStyle={styles.inputContainer}
            />

            <View style={styles.row}>
              <Input
                label="Date d'expiration"
                value={expiryDate}
                onChangeText={setExpiryDate}
                placeholder="MM/YY"
                containerStyle={[styles.inputContainer, styles.halfWidth]}
              />
              <Input
                label="CVV"
                value={cvv}
                onChangeText={setCvv}
                placeholder="123"
                keyboardType="numeric"
                secureTextEntry
                containerStyle={[styles.inputContainer, styles.halfWidth]}
              />
            </View>
          </View>
        )}

        {/* Billing Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adresse de facturation</Text>
          <Input
            label="Adresse"
            value={billingAddress}
            onChangeText={setBillingAddress}
            placeholder="Entrer votre adresse"
            multiline
            numberOfLines={3}
            containerStyle={styles.inputContainer}
          />
        </View>

        {/* Pay Button */}
        <Button
          title={`Payer ${formatPrice(totalPrice, currency)}`}
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
  summaryCard: {
    backgroundColor: colors.background.tertiary,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
    marginBottom: spacing.base,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
  },
  summaryValue: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
  },
  summaryTotal: {
    ...typography.styles.bodyBold18,
    color: colors.primary.normal,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
    marginBottom: spacing.base,
  },
  paymentMethodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.normal,
    marginBottom: spacing.sm,
  },
  paymentMethodSelected: {
    borderColor: colors.primary.normal,
    backgroundColor: colors.primary.light,
  },
  paymentMethodText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
    marginLeft: spacing.base,
  },
  paymentMethodTextSelected: {
    ...typography.styles.bodyMedium16,
    color: colors.primary.normal,
  },
  inputContainer: {
    marginBottom: spacing.base,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  halfWidth: {
    flex: 1,
  },
  payButton: {
    marginTop: spacing.base,
  },
});

