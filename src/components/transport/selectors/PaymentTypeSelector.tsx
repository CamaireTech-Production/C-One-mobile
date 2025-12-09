/**
 * PaymentTypeSelector Component
 * Radio buttons for Standard/Economique payment options
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
import { colors, spacing, typography } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

export type PaymentType = 'standard' | 'economique';

export interface PaymentTypeSelectorProps {
  selectedType: PaymentType;
  onTypeChange: (type: PaymentType) => void;
  containerStyle?: ViewStyle;
  primaryColor?: string;
}

const PAYMENT_TYPES: { value: PaymentType; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'economique', label: 'Economique' },
];

export const PaymentTypeSelector: React.FC<PaymentTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
  containerStyle,
  primaryColor = colors.primary.normal,
}) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>Type de paiement</Text>
      <View style={styles.optionsContainer}>
        {PAYMENT_TYPES.map((option) => {
          const isSelected = selectedType === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                isSelected && { backgroundColor: primaryColor, borderColor: primaryColor },
              ]}
              onPress={() => onTypeChange(option.value)}
              activeOpacity={0.7}
            >
              <View style={styles.radioContainer}>
                <View style={[styles.radio, isSelected && { borderColor: colors.text.inverse }]}>
                  {isSelected && (
                    <View style={[styles.radioInner, { backgroundColor: colors.text.inverse }]} />
                  )}
                </View>
                <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                  {option.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
    marginBottom: spacing.base,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: spacing.base,
  },
  option: {
    flex: 1,
    padding: spacing.base,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.normal,
    backgroundColor: colors.background.tertiary,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.normal,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  optionLabel: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
  optionLabelSelected: {
    ...typography.styles.bodyMedium16,
    color: colors.text.inverse,
  },
});

