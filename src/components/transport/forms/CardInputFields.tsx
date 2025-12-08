/**
 * CardInputFields Component
 * Input fields for card number, expiry date, and CVV with proper formatting
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

export interface CardInputFieldsData {
  cardNumber: string;
  expiryDate: string; // MM/YY format
  cvv: string;
}

export interface CardInputFieldsProps {
  data: CardInputFieldsData;
  onChange: (data: CardInputFieldsData) => void;
  containerStyle?: ViewStyle;
  primaryColor?: string;
}

export const CardInputFields: React.FC<CardInputFieldsProps> = ({
  data,
  onChange,
  containerStyle,
  primaryColor = colors.primary.normal,
}) => {
  const { t } = useTranslation();

  const updateField = <K extends keyof CardInputFieldsData>(
    field: K,
    value: CardInputFieldsData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  // Format card number with spaces every 4 digits
  const formatCardNumber = (text: string): string => {
    const cleaned = text.replace(/\s/g, '').replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (text: string): string => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  // Format CVV (3-4 digits only)
  const formatCVV = (text: string): string => {
    return text.replace(/\D/g, '').slice(0, 4);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.sectionTitle}>Informations de paiement</Text>

      {/* Card Number */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Numéro de carte</Text>
        <View style={[styles.inputWrapper, { borderColor: colors.border.normal }]}>
          <View style={styles.inputIcon}>
            <Icon
              name="card-outline"
              size={20}
              color={primaryColor}
              family="ionicons"
            />
          </View>
          <TextInput
            style={styles.input}
            value={data.cardNumber}
            onChangeText={(text) => updateField('cardNumber', formatCardNumber(text))}
            placeholder="1234 5678 9012 3456"
            placeholderTextColor={colors.text.tertiary}
            keyboardType="numeric"
            maxLength={19}
          />
        </View>
      </View>

      {/* Expiry Date and CVV Row */}
      <View style={styles.row}>
        {/* Expiry Date */}
        <View style={[styles.inputContainer, styles.halfWidth]}>
          <Text style={styles.label}>Date d'expiration</Text>
          <View style={[styles.inputWrapper, { borderColor: colors.border.normal }]}>
            <View style={styles.inputIcon}>
              <Icon
                name="calendar-outline"
                size={20}
                color={primaryColor}
                family="ionicons"
              />
            </View>
            <TextInput
              style={styles.input}
              value={data.expiryDate}
              onChangeText={(text) => updateField('expiryDate', formatExpiryDate(text))}
              placeholder="MM/YY"
              placeholderTextColor={colors.text.tertiary}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
        </View>

        {/* CVV */}
        <View style={[styles.inputContainer, styles.halfWidth]}>
          <Text style={styles.label}>CVV</Text>
          <View style={[styles.inputWrapper, { borderColor: colors.border.normal }]}>
            <View style={styles.inputIcon}>
              <Icon
                name="lock-closed-outline"
                size={20}
                color={primaryColor}
                family="ionicons"
              />
            </View>
            <TextInput
              style={styles.input}
              value={data.cvv}
              onChangeText={(text) => updateField('cvv', formatCVV(text))}
              placeholder="123"
              placeholderTextColor={colors.text.tertiary}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
    marginBottom: spacing.base,
  },
  inputContainer: {
    marginBottom: spacing.base,
  },
  halfWidth: {
    flex: 1,
    marginRight: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  label: {
    ...typography.styles.inputLabel,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
  inputIcon: {
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    ...typography.styles.input,
    color: colors.text.primary,
    paddingVertical: 0,
  },
});

