/**
 * DateFilterBar Component
 * Month selector with horizontal scrollable days
 * Shows selected date with highlight
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

interface DateFilterBarProps {
  selectedDate?: string; // Format: "DD-MM-YYYY"
  onDateSelect?: (date: string) => void;
  month?: string; // Current month (e.g., "Novembre")
  onMonthChange?: (direction: 'prev' | 'next') => void;
  containerStyle?: ViewStyle;
}

// Generate dates for the current month
const generateDates = (month: string, year: number = 2025) => {
  const monthMap: Record<string, number> = {
    janvier: 0,
    février: 1,
    mars: 2,
    avril: 3,
    mai: 4,
    juin: 5,
    juillet: 6,
    août: 7,
    septembre: 8,
    octobre: 9,
    novembre: 10,
    décembre: 11,
  };

  const monthIndex = monthMap[month.toLowerCase()] ?? 10;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const dates: Array<{ day: number; date: string; dayName: string }> = [];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, monthIndex, day);
    const dayName = dayNames[date.getDay()];
    const dateString = `${String(day).padStart(2, '0')}-${String(monthIndex + 1).padStart(2, '0')}-${year}`;
    dates.push({ day, date: dateString, dayName });
  }

  return dates;
};

export const DateFilterBar: React.FC<DateFilterBarProps> = ({
  selectedDate,
  onDateSelect,
  month = 'Novembre',
  onMonthChange,
  containerStyle,
}) => {
  const [currentYear] = useState(2025);
  const dates = generateDates(month, currentYear);

  const handleDatePress = (date: string) => {
    onDateSelect?.(date);
  };

  const isSelected = (date: string) => {
    return selectedDate === date;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Month Selector */}
      <View style={styles.monthSelector}>
        <TouchableOpacity
          onPress={() => onMonthChange?.('prev')}
          style={styles.monthButton}
          activeOpacity={0.7}
        >
          <Icon name="chevron-back" size={20} color={colors.text.primary} family="ionicons" />
        </TouchableOpacity>

        <Text style={styles.monthText}>{month}</Text>

        <TouchableOpacity
          onPress={() => onMonthChange?.('next')}
          style={styles.monthButton}
          activeOpacity={0.7}
        >
          <Icon name="chevron-forward" size={20} color={colors.text.primary} family="ionicons" />
        </TouchableOpacity>
      </View>

      {/* Days Scrollable List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysContainer}
      >
        {dates.map((dateItem) => {
          const selected = isSelected(dateItem.date);
          return (
            <TouchableOpacity
              key={dateItem.date}
              style={[styles.dateButton, selected && styles.dateButtonSelected]}
              onPress={() => handleDatePress(dateItem.date)}
              activeOpacity={0.7}
            >
              <Text style={[styles.dateDay, selected && styles.dateDaySelected]}>
                {dateItem.day}
              </Text>
              <Text style={[styles.dateName, selected && styles.dateNameSelected]}>
                {dateItem.dayName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transport.flight.primary,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.base,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  monthButton: {
    padding: spacing.sm,
  },
  monthText: {
    ...typography.styles.bodyMedium18,
    color: colors.text.inverse,
    marginHorizontal: spacing.base,
  },
  daysContainer: {
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
  },
  dateButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  dateButtonSelected: {
    backgroundColor: colors.text.inverse,
    borderWidth: 2,
    borderColor: colors.transport.flight.primary,
  },
  dateDay: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
  },
  dateDaySelected: {
    ...typography.styles.bodyBold16,
    color: colors.transport.flight.primary,
  },
  dateName: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs / 2,
  },
  dateNameSelected: {
    color: colors.transport.flight.primary,
  },
});

