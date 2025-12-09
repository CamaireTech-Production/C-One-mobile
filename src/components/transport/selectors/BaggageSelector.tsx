/**
 * BaggageSelector Component
 * Selector for baggage: number of bags + weight per bag
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../../common/icons/Icon';
import { PassengerCounter } from '../forms/PassengerCounter';
import type { BaggageItem } from '../../../types/transport';

interface BaggageSelectorProps {
  baggage: BaggageItem[];
  onChange: (baggage: BaggageItem[]) => void;
  title?: string;
  containerStyle?: ViewStyle;
}

export const BaggageSelector: React.FC<BaggageSelectorProps> = ({
  baggage,
  onChange,
  title,
  containerStyle,
}) => {
  const { t } = useTranslation();
  const displayTitle = title || t('transport.booking.baggage.title');
  const handleBaggageCountChange = (count: number) => {
    const newBaggage: BaggageItem[] = [];
    for (let i = 0; i < count; i++) {
      newBaggage.push({
        id: `baggage-${i + 1}`,
        weight: baggage[i]?.weight || 1,
      });
    }
    onChange(newBaggage);
  };

  const handleWeightChange = (index: number, weight: number) => {
    const newBaggage = [...baggage];
    newBaggage[index] = {
      ...newBaggage[index],
      weight,
    };
    onChange(newBaggage);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{displayTitle}</Text>

      <PassengerCounter
        label={t('transport.booking.baggage.label')}
        value={baggage.length}
        onChange={handleBaggageCountChange}
        min={0}
        max={5}
      />

      {baggage.length > 0 && (
        <View style={styles.weightContainer}>
          <Text style={styles.weightLabel}>{t('transport.booking.baggage.weightLabel')}</Text>
          {baggage.map((item, index) => (
            <View key={item.id} style={styles.weightItem}>
              <Text style={styles.baggageLabel}>
                {t('transport.booking.baggage.baggageLabel', { index: index + 1 })}
              </Text>
              <PassengerCounter
                label={t('transport.booking.baggage.empty')}
                value={item.weight}
                onChange={(weight) => handleWeightChange(index, weight)}
                min={1}
                max={50}
                containerStyle={styles.weightCounter}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.styles.h4,
    color: colors.text.primary,
    marginBottom: spacing.base,
  },
  weightContainer: {
    marginTop: spacing.base,
  },
  weightLabel: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  weightItem: {
    marginBottom: spacing.sm,
  },
  baggageLabel: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  weightCounter: {
    marginBottom: 0,
  },
});

