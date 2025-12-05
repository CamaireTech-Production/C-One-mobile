/**
 * DateFilterBar Component
 * Month selector with horizontal scrollable days
 * Shows selected date with highlight
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 60;
const CARD_MARGIN = spacing.sm; // 8px typically
const CARD_TOTAL_WIDTH = CARD_WIDTH + CARD_MARGIN; // 68px total per card

interface DateFilterBarProps {
  selectedDate?: string; // Format: "DD-MM-YYYY"
  onDateSelect?: (date: string) => void;
  month?: string; // Current month (e.g., "Novembre")
  onMonthChange?: (direction: 'prev' | 'next') => void;
  containerStyle?: ViewStyle;
  iconColor?: string; // Color for navigation icons (default: colors.text.primary)
  monthTextColor?: string; // Color for month text (default: colors.text.inverse)
}

// Get today's date in DD-MM-YYYY format
const getTodayDate = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

// Get current month name in French
const getCurrentMonth = (): string => {
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ];
  return months[new Date().getMonth()];
};

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
  month,
  onMonthChange,
  containerStyle,
  iconColor = colors.text.primary,
  monthTextColor = colors.text.inverse,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const hasScrolledRef = useRef(false); // Track if we've already scrolled on mount
  const currentYear = new Date().getFullYear();
  
  // Get today's date and current month as defaults
  const todayDate = getTodayDate();
  const currentMonthName = getCurrentMonth();
  
  // Use provided month or current month, use selectedDate or today's date
  const activeMonth = month || currentMonthName;
  const activeDate = selectedDate || todayDate;
  
  // Notify parent if no date was provided (default to today)
  // Also ensure month matches the date
  useEffect(() => {
    if (!selectedDate && onDateSelect) {
      onDateSelect(todayDate);
    }
    // If month doesn't match the selected date, update it
    if (selectedDate && month) {
      const dateParts = selectedDate.split('-');
      if (dateParts.length === 3) {
        const dateMonthIndex = parseInt(dateParts[1], 10) - 1;
        const monthMap: Record<string, number> = {
          janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
          juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11,
        };
        const currentMonthIndex = monthMap[month.toLowerCase()] ?? -1;
        if (dateMonthIndex !== currentMonthIndex && onMonthChange) {
          // Month doesn't match, but we'll let the parent handle this
          // The dates array will be regenerated with the correct month
        }
      }
    }
  }, [selectedDate, month, onDateSelect, todayDate, onMonthChange]);
  
  const dates = generateDates(activeMonth, currentYear);

  // Scroll to center the selected date when component mounts or date changes
  const scrollToSelectedDate = useCallback(() => {
    if (dates.length === 0 || !scrollViewRef.current) return;
    
    const selectedIndex = dates.findIndex((d) => d.date === activeDate);
    if (selectedIndex >= 0) {
      // Calculate scroll position to center the selected card
      // Account for the padding: paddingLeft = SCREEN_WIDTH / 2 - CARD_WIDTH / 2
      // Position = (index * card width) - (screen width / 2) + (card width / 2)
      const scrollPosition = selectedIndex * CARD_TOTAL_WIDTH - SCREEN_WIDTH / 2 + CARD_WIDTH / 2;
      
      scrollViewRef.current.scrollTo({
        x: Math.max(0, scrollPosition),
        animated: false, // No animation on initial load
      });
    }
  }, [dates, activeDate]);

  // Scroll when date or month changes (but not on initial mount - that's handled by onLayout)
  useEffect(() => {
    if (hasScrolledRef.current && dates.length > 0) {
      // Use a small delay to ensure dates array is updated
      const timeoutId = setTimeout(() => {
        scrollToSelectedDate();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [activeDate, activeMonth, dates.length, scrollToSelectedDate]); // Include scrollToSelectedDate and dates.length in dependencies

  const handleDatePress = (date: string) => {
    onDateSelect?.(date);
    
    // Scroll to center the newly selected date
    const selectedIndex = dates.findIndex((d) => d.date === date);
    if (selectedIndex >= 0 && scrollViewRef.current) {
      const scrollPosition = selectedIndex * CARD_TOTAL_WIDTH - SCREEN_WIDTH / 2 + CARD_WIDTH / 2;
      scrollViewRef.current.scrollTo({
        x: Math.max(0, scrollPosition),
        animated: true,
      });
    }
  };

  const isSelected = (date: string) => {
    return activeDate === date;
  };

  // Handle layout completion - scroll to selected date on initial mount
  const handleLayout = () => {
    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true;
      // Use requestAnimationFrame and setTimeout to ensure layout is complete
      requestAnimationFrame(() => {
        setTimeout(() => {
          scrollToSelectedDate();
        }, 100);
      });
    }
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
          <Icon name="chevron-back" size={20} color={iconColor} family="ionicons" />
        </TouchableOpacity>

        <Text style={[styles.monthText, { color: monthTextColor }]}>{activeMonth}</Text>

        <TouchableOpacity
          onPress={() => onMonthChange?.('next')}
          style={styles.monthButton}
          activeOpacity={0.7}
        >
          <Icon name="chevron-forward" size={20} color={iconColor} family="ionicons" />
        </TouchableOpacity>
      </View>

      {/* Days Scrollable List */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.daysContainer,
          {
            paddingLeft: SCREEN_WIDTH / 2 - CARD_WIDTH / 2, // Half screen minus half card width to show cut-off on left
            paddingRight: SCREEN_WIDTH / 2 - CARD_WIDTH / 2, // Half screen minus half card width to show cut-off on right
          },
        ]}
        style={styles.daysScrollView}
        bounces={true}
        onLayout={handleLayout}
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
    paddingHorizontal: 0, // No horizontal padding to allow full-width scroll
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.base, // Padding only for month selector
  },
  monthButton: {
    padding: spacing.sm,
  },
  monthText: {
    ...typography.styles.bodyMedium18,
    marginHorizontal: spacing.base,
  },
  daysScrollView: {
    width: '100%', // Full width
  },
  daysContainer: {
    gap: spacing.sm,
    alignItems: 'center', // Center cards vertically
  },
  dateButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'transparent', // Transparent for inactive
    borderWidth: 1,
    borderColor: colors.text.inverse, // White border
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  dateButtonSelected: {
    backgroundColor: colors.primary.light, // #EAF4F9
    borderWidth: 0, // No border for selected
  },
  dateDay: {
    ...typography.styles.bodyBold16,
    fontSize: 16,
    color: colors.text.inverse, // White text for inactive
  },
  dateDaySelected: {
    ...typography.styles.bodyBold16,
    fontSize: 16,
    color: colors.primary.normal, // #288CBE for active
  },
  dateName: {
    ...typography.styles.bodyBold16,
    fontSize: 16,
    color: colors.text.inverse, // White text for inactive
    marginTop: spacing.xs / 2,
  },
  dateNameSelected: {
    ...typography.styles.bodyBold16,
    fontSize: 16,
    color: colors.primary.normal, // #288CBE for active
  },
});

