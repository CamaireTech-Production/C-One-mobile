/**
 * TripTypeFilter Component
 * Tabs for filtering Non stop / Transfer trips
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../../../theme';

export type TripType = 'non-stop' | 'transfer';

interface TripTypeFilterProps {
  selectedType: TripType;
  onTypeChange: (type: TripType) => void;
  containerStyle?: ViewStyle;
}

export const TripTypeFilter: React.FC<TripTypeFilterProps> = ({
  selectedType,
  onTypeChange,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.tab, selectedType === 'non-stop' && styles.tabSelected]}
        onPress={() => onTypeChange('non-stop')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.tabText,
            selectedType === 'non-stop' && styles.tabTextSelected,
          ]}
        >
          Non stop
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedType === 'transfer' && styles.tabSelected]}
        onPress={() => onTypeChange('transfer')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.tabText,
            selectedType === 'transfer' && styles.tabTextSelected,
          ]}
        >
          Transfer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  tabSelected: {
    backgroundColor: colors.transport.flight.primary,
  },
  tabText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.secondary,
  },
  tabTextSelected: {
    ...typography.styles.bodyBold16,
    color: colors.text.inverse,
  },
});

