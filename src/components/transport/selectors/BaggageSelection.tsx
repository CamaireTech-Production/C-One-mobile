/**
 * BaggageSelection Component
 * Visual baggage selector with carry-on/checked baggage icons
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

export type BaggageType = 'carry-on' | 'checked';

export interface BaggageSelectionProps {
  selectedBaggage: BaggageType[];
  onBaggageChange: (baggage: BaggageType[]) => void;
  containerStyle?: ViewStyle;
  primaryColor?: string;
}

const BAGGAGE_OPTIONS: { type: BaggageType; label: string; icon: string }[] = [
  { type: 'carry-on', label: 'Bagage à main', icon: 'briefcase-outline' },
  { type: 'checked', label: 'Bagage en soute', icon: 'bag-outline' },
];

export const BaggageSelection: React.FC<BaggageSelectionProps> = ({
  selectedBaggage,
  onBaggageChange,
  containerStyle,
  primaryColor = colors.primary.normal,
}) => {
  const { t } = useTranslation();

  const handleBaggageToggle = (type: BaggageType) => {
    if (selectedBaggage.includes(type)) {
      // Remove from selection
      onBaggageChange(selectedBaggage.filter((b) => b !== type));
    } else {
      // Add to selection
      onBaggageChange([...selectedBaggage, type]);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>Sélection de bagage</Text>
      <View style={styles.baggageContainer}>
        {BAGGAGE_OPTIONS.map((option) => {
          const isSelected = selectedBaggage.includes(option.type);
          return (
            <TouchableOpacity
              key={option.type}
              style={[
                styles.baggageOption,
                isSelected && { backgroundColor: primaryColor, borderColor: primaryColor },
              ]}
              onPress={() => handleBaggageToggle(option.type)}
              activeOpacity={0.7}
            >
              <View style={styles.baggageIconContainer}>
                <Icon
                  name={option.icon}
                  size={32}
                  color={isSelected ? colors.text.inverse : primaryColor}
                  family="ionicons"
                />
              </View>
              <Text style={[styles.baggageLabel, isSelected && styles.baggageLabelSelected]}>
                {option.label}
              </Text>
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
  baggageContainer: {
    flexDirection: 'row',
    gap: spacing.base,
  },
  baggageOption: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.normal,
    backgroundColor: colors.background.tertiary,
  },
  baggageIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  baggageLabel: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
    textAlign: 'center',
  },
  baggageLabelSelected: {
    ...typography.styles.bodyMedium16,
    color: colors.text.inverse,
  },
});

