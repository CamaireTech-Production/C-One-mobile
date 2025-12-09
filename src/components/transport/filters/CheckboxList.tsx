/**
 * CheckboxList Component
 * List of checkboxes for selecting multiple options (e.g., airlines, companies)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

export interface CheckboxOption {
  id: string;
  label: string;
}

export interface CheckboxListProps {
  label: string;
  options: CheckboxOption[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  containerStyle?: ViewStyle;
}

export const CheckboxList: React.FC<CheckboxListProps> = ({
  label,
  options,
  selectedIds,
  onSelectionChange,
  containerStyle,
}) => {
  const handleToggle = (optionId: string) => {
    if (selectedIds.includes(optionId)) {
      // Remove from selection
      onSelectionChange(selectedIds.filter((id) => id !== optionId));
    } else {
      // Add to selection
      onSelectionChange([...selectedIds, optionId]);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          return (
            <TouchableOpacity
              key={option.id}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => handleToggle(option.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                {isSelected && (
                  <Icon name="checkmark" size={16} color={colors.text.inverse} family="ionicons" />
                )}
              </View>
              <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
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
  optionsContainer: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.background.tertiary,
  },
  optionSelected: {
    backgroundColor: colors.primary.light,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border.normal,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary.normal,
    borderColor: colors.primary.normal,
  },
  optionLabel: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
    flex: 1,
  },
  optionLabelSelected: {
    color: colors.primary.dark,
  },
});

