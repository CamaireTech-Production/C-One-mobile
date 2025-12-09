/**
 * CalendarModal Component
 * Full-screen calendar modal for date selection with month navigation
 * Used in transport search forms (flight, train)
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

export interface CalendarModalProps {
  visible: boolean;
  selectedDate?: string; // Format: "DD-MM-YYYY"
  onDateSelect: (date: string) => void;
  onClose: () => void;
  minDate?: Date; // Minimum selectable date
  maxDate?: Date; // Maximum selectable date
  primaryColor?: string; // Theme color for calendar
}

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const DAYS_OF_WEEK = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

export const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  selectedDate,
  onDateSelect,
  onClose,
  minDate,
  maxDate,
  primaryColor = colors.primary.normal,
}) => {
  const { t } = useTranslation();

  // Parse selected date or use today
  const parseDate = (dateString?: string): Date => {
    if (dateString) {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    }
    return new Date();
  };

  const [currentDate, setCurrentDate] = useState<Date>(parseDate(selectedDate));
  const selectedDateObj = parseDate(selectedDate);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const monthName = MONTHS[currentMonth];

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  }, [currentMonth, currentYear, startingDayOfWeek, daysInMonth]);

  // Navigate to previous month
  const handlePrevMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    setCurrentDate(newDate);
  };

  // Navigate to next month
  const handleNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    setCurrentDate(newDate);
  };

  // Check if date is selectable
  const isDateSelectable = (day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day);
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
  };

  // Check if date is selected
  const isDateSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    const date = new Date(currentYear, currentMonth, day);
    return (
      date.getDate() === selectedDateObj.getDate() &&
      date.getMonth() === selectedDateObj.getMonth() &&
      date.getFullYear() === selectedDateObj.getFullYear()
    );
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    if (!isDateSelectable(day)) return;
    
    const dayStr = String(day).padStart(2, '0');
    const monthStr = String(currentMonth + 1).padStart(2, '0');
    const yearStr = String(currentYear);
    const dateString = `${dayStr}-${monthStr}-${yearStr}`;
    
    onDateSelect(dateString);
  };

  // Format date for display
  const formatDateForDisplay = (dateString?: string): string => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      const dayName = DAYS_OF_WEEK[date.getDay()];
      return `${dayName}, ${parts[0]} ${MONTHS[month].substring(0, 3)}`;
    }
    return dateString;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Icon name="close" size={24} color={colors.text.primary} family="ionicons" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sélectionner une date</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Month Navigation */}
          <View style={styles.monthNavigation}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={handlePrevMonth}
              activeOpacity={0.7}
            >
              <Icon name="chevron-back" size={24} color={colors.text.primary} family="ionicons" />
            </TouchableOpacity>
            
            <Text style={styles.monthText}>
              {monthName} {currentYear}
            </Text>
            
            <TouchableOpacity
              style={styles.navButton}
              onPress={handleNextMonth}
              activeOpacity={0.7}
            >
              <Icon name="chevron-forward" size={24} color={colors.text.primary} family="ionicons" />
            </TouchableOpacity>
          </View>

          {/* Days of Week Header */}
          <View style={styles.daysOfWeekHeader}>
            {DAYS_OF_WEEK.map((day, index) => (
              <View key={index} style={styles.dayOfWeekCell}>
                <Text style={styles.dayOfWeekText}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Calendar Grid */}
          <ScrollView style={styles.calendarScroll} contentContainerStyle={styles.calendarGrid}>
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <View key={`empty-${index}`} style={styles.calendarDay} />;
              }

              const selectable = isDateSelectable(day);
              const selected = isDateSelected(day);

              return (
                <TouchableOpacity
                  key={`day-${day}`}
                  style={[
                    styles.calendarDay,
                    selected && { backgroundColor: primaryColor },
                    !selectable && styles.calendarDayDisabled,
                  ]}
                  onPress={() => handleDateSelect(day)}
                  disabled={!selectable}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.calendarDayText,
                      selected && styles.calendarDayTextSelected,
                      !selectable && styles.calendarDayTextDisabled,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Selected Date Display */}
          {selectedDate && (
            <View style={styles.selectedDateContainer}>
              <Text style={styles.selectedDateLabel}>Date sélectionnée:</Text>
              <Text style={styles.selectedDateText}>
                {formatDateForDisplay(selectedDate)}
              </Text>
            </View>
          )}

          {/* Confirm Button */}
          <TouchableOpacity
            style={[styles.confirmButton, { backgroundColor: primaryColor }]}
            onPress={() => {
              if (selectedDate) {
                onClose();
              }
            }}
            activeOpacity={0.7}
            disabled={!selectedDate}
          >
            <Text style={styles.confirmButtonText}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: spacing.lg,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: spacing.base,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  closeButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.base,
  },
  navButton: {
    padding: spacing.xs,
  },
  monthText: {
    ...typography.styles.h3,
    color: colors.text.primary,
  },
  daysOfWeekHeader: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  dayOfWeekCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  dayOfWeekText: {
    ...typography.styles.bodyMedium14,
    color: colors.text.secondary,
  },
  calendarScroll: {
    maxHeight: 300,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 2,
  },
  calendarDayDisabled: {
    opacity: 0.3,
  },
  calendarDayText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
  },
  calendarDayTextSelected: {
    ...typography.styles.bodyBold16,
    color: colors.text.inverse,
  },
  calendarDayTextDisabled: {
    color: colors.text.tertiary,
  },
  selectedDateContainer: {
    marginTop: spacing.lg,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.base,
    backgroundColor: colors.background.tertiary,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedDateLabel: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  selectedDateText: {
    ...typography.styles.bodyBold16,
    color: colors.text.primary,
  },
  confirmButton: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    ...typography.styles.bodyBold18,
    color: colors.text.inverse,
  },
});

