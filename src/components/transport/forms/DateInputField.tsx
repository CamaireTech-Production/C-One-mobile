/**
 * DateInputField Component
 * Input field for date selection with calendar icon
 * Format: DD-MM-YYYY
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Modal, Platform } from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Input } from '../../common/forms/Input';
import { Icon } from '../../common/icons/Icon';

interface DateInputFieldProps {
  label: string;
  value?: string; // Format: "DD-MM-YYYY"
  placeholder?: string;
  onChange?: (date: string) => void; // Returns date in "DD-MM-YYYY" format
  minimumDate?: Date;
  maximumDate?: Date;
  containerStyle?: ViewStyle;
  editable?: boolean;
}

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  const parts = dateString.split('-');
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
};

export const DateInputField: React.FC<DateInputFieldProps> = ({
  label,
  value,
  placeholder = '10-11-2025',
  onChange,
  minimumDate,
  maximumDate,
  containerStyle,
  editable = true,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    value ? parseDate(value) || new Date() : new Date()
  );

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (date) {
      setSelectedDate(date);
      const formattedDate = formatDate(date);
      onChange?.(formattedDate);
    }
  };

  const handlePress = () => {
    if (editable) {
      setShowPicker(true);
    }
  };

  const displayValue = value || formatDate(selectedDate);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={handlePress} disabled={!editable} activeOpacity={0.7}>
        <Input
          value={displayValue}
          placeholder={placeholder}
          editable={false}
          leftIcon={
            <Icon
              name="calendar-outline"
              size={20}
              color={colors.text.secondary}
              family="ionicons"
            />
          }
          style={styles.input}
        />
      </TouchableOpacity>

      {showPicker && (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={() => setShowPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sélectionner une date</Text>
              <Text style={styles.modalHint}>
                Utilisez le format DD-MM-YYYY (ex: 10-11-2025)
              </Text>
              <Input
                value={displayValue}
                placeholder="DD-MM-YYYY"
                onChangeText={(text) => {
                  const parsed = parseDate(text);
                  if (parsed) {
                    setSelectedDate(parsed);
                    onChange?.(text);
                  }
                }}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowPicker(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.modalButtonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  label: {
    ...typography.styles.inputLabel,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  input: {
    ...typography.styles.input,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.lg,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  modalHint: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginBottom: spacing.base,
  },
  modalButton: {
    backgroundColor: colors.primary.normal,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    marginTop: spacing.base,
    alignItems: 'center',
  },
  modalButtonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
  },
});

