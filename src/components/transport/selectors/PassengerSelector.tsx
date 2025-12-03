/**
 * PassengerSelector Component
 * Selector for passengers: Adultes, Enfants, Bébés with counters
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, typography, spacing } from '../../../theme';
import { PassengerCounter } from '../forms/PassengerCounter';
import type { PassengerCount } from '../../../types/transport';

interface PassengerSelectorProps {
  passengers: PassengerCount;
  onChange: (passengers: PassengerCount) => void;
  title?: string;
  containerStyle?: ViewStyle;
}

export const PassengerSelector: React.FC<PassengerSelectorProps> = ({
  passengers,
  onChange,
  title = 'Qui veut vous voir?',
  containerStyle,
}) => {
  const { t } = useTranslation();
  const handleAdultsChange = (value: number) => {
    onChange({ ...passengers, adults: value });
  };

  const handleChildrenChange = (value: number) => {
    onChange({ ...passengers, children: value });
  };

  const handleBabiesChange = (value: number) => {
    onChange({ ...passengers, babies: value });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>

      <PassengerCounter
        label={t('transport.booking.passengers.adults')}
        value={passengers.adults}
        onChange={handleAdultsChange}
        min={1}
        max={10}
      />

      <PassengerCounter
        label={t('transport.booking.passengers.children')}
        value={passengers.children}
        onChange={handleChildrenChange}
        min={0}
        max={10}
      />

      <PassengerCounter
        label={t('transport.booking.passengers.babies')}
        value={passengers.babies}
        onChange={handleBabiesChange}
        min={0}
        max={5}
      />
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
});

