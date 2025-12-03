/**
 * ClassSelector Component
 * Radio buttons for selecting transport class: Standard / VIP
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../../common/icons/Icon';
import type { TransportClass } from '../../../types/transport';

interface ClassSelectorProps {
  selectedClass: TransportClass;
  onClassChange: (classType: TransportClass) => void;
  title?: string;
  containerStyle?: ViewStyle;
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({
  selectedClass,
  onClassChange,
  title = 'Choisir une formule',
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={[styles.option, selectedClass === 'standard' && styles.optionSelected]}
        onPress={() => onClassChange('standard')}
        activeOpacity={0.7}
      >
        <View style={styles.radioContainer}>
          {selectedClass === 'standard' ? (
            <Icon name="radio-button-on" size={24} color={colors.primary.normal} family="ionicons" />
          ) : (
            <Icon name="radio-button-off" size={24} color={colors.text.secondary} family="ionicons" />
          )}
        </View>
        <Text style={[styles.optionText, selectedClass === 'standard' && styles.optionTextSelected]}>
          Standard / économique
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selectedClass === 'vip' && styles.optionSelected]}
        onPress={() => onClassChange('vip')}
        activeOpacity={0.7}
      >
        <View style={styles.radioContainer}>
          {selectedClass === 'vip' ? (
            <Icon name="radio-button-on" size={24} color={colors.primary.normal} family="ionicons" />
          ) : (
            <Icon name="radio-button-off" size={24} color={colors.text.secondary} family="ionicons" />
          )}
        </View>
        <Text style={[styles.optionText, selectedClass === 'vip' && styles.optionTextSelected]}>
          VIP / première classe
        </Text>
      </TouchableOpacity>
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderRadius: 8,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.normal,
  },
  optionSelected: {
    borderColor: colors.primary.normal,
    backgroundColor: colors.primary.light,
  },
  radioContainer: {
    marginRight: spacing.base,
  },
  optionText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
  optionTextSelected: {
    ...typography.styles.bodyMedium16,
    color: colors.primary.normal,
  },
});

