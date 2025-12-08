/**
 * SeatSelection Component
 * Visual seat selector with window/aisle icons for flight and train booking
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

export type SeatType = 'window' | 'aisle' | 'middle';

export interface SeatSelectionProps {
  selectedSeat: SeatType | null;
  onSeatChange: (seat: SeatType) => void;
  containerStyle?: ViewStyle;
  primaryColor?: string;
}

const SEAT_OPTIONS: { type: SeatType; label: string; icon: string }[] = [
  { type: 'window', label: 'Fenêtre', icon: 'square-outline' },
  { type: 'aisle', label: 'Couloir', icon: 'square-outline' },
];

export const SeatSelection: React.FC<SeatSelectionProps> = ({
  selectedSeat,
  onSeatChange,
  containerStyle,
  primaryColor = colors.primary.normal,
}) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>Sélection de siège</Text>
      <View style={styles.seatsContainer}>
        {SEAT_OPTIONS.map((option) => {
          const isSelected = selectedSeat === option.type;
          return (
            <TouchableOpacity
              key={option.type}
              style={[
                styles.seatOption,
                isSelected && { backgroundColor: primaryColor, borderColor: primaryColor },
              ]}
              onPress={() => onSeatChange(option.type)}
              activeOpacity={0.7}
            >
              <View style={styles.seatIconContainer}>
                <Icon
                  name={option.type === 'window' ? 'square-outline' : 'square-outline'}
                  size={32}
                  color={isSelected ? colors.text.inverse : primaryColor}
                  family="ionicons"
                />
                {option.type === 'window' && (
                  <View style={[styles.windowIndicator, { backgroundColor: isSelected ? colors.text.inverse : primaryColor }]} />
                )}
              </View>
              <Text style={[styles.seatLabel, isSelected && styles.seatLabelSelected]}>
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
  seatsContainer: {
    flexDirection: 'row',
    gap: spacing.base,
  },
  seatOption: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.normal,
    backgroundColor: colors.background.tertiary,
  },
  seatIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    position: 'relative',
  },
  windowIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  seatLabel: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
  seatLabelSelected: {
    ...typography.styles.bodyMedium16,
    color: colors.text.inverse,
  },
});

