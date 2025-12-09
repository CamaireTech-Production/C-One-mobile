/**
 * TransportFiltersScreen
 * Full-screen filters with escales slider, departure/arrival time sliders,
 * duration slider, airlines/companies checkboxes, and rating selector
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../../types';

import {
  ScreenBackground,
  DetailHeader,
  Button,
} from '../../../components/common';
import { RangeSlider } from '../../../components/transport/filters/RangeSlider';
import { TimeRangeSlider } from '../../../components/transport/filters/TimeRangeSlider';
import { RatingSelector } from '../../../components/transport/filters/RatingSelector';
import { CheckboxList, type CheckboxOption } from '../../../components/transport/filters/CheckboxList';
import { colors, spacing, typography } from '../../../theme';
import { useHideTabBar } from '../../../hooks';

export interface TransportFilters {
  escales: number; // 0-10
  departureTimeStart: number; // Minutes from midnight
  departureTimeEnd: number;
  arrivalTimeStart: number;
  arrivalTimeEnd: number;
  durationMin: number; // Minutes
  durationMax: number;
  selectedAirlines: string[];
  selectedCompanies: string[];
  rating: number; // 0-5
}

interface TransportFiltersScreenParams {
  transportType: 'flight' | 'train';
  currentFilters?: Partial<TransportFilters>;
  onApply?: (filters: TransportFilters) => void;
}

type TransportFiltersScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'TransportFilters'
>;

// Mock airlines for flights
const FLIGHT_AIRLINES: CheckboxOption[] = [
  { id: 'air-france', label: 'Air France' },
  { id: 'fly-emirates', label: 'Fly Emirates' },
  { id: 'lufthansa', label: 'Lufthansa' },
  { id: 'british-airways', label: 'British Airways' },
  { id: 'camair-co', label: 'Camair-co' },
];

// Mock train companies
const TRAIN_COMPANIES: CheckboxOption[] = [
  { id: 'sncf', label: 'SNCF' },
  { id: 'eurostar', label: 'Eurostar' },
  { id: 'thales', label: 'Thales' },
];

export const TransportFiltersScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<TransportFiltersScreenNavigationProp>();
  const params = route.params as TransportFiltersScreenParams;

  // Hide tab bar when this screen is focused
  useHideTabBar();

  const transportType = params.transportType || 'flight';
  const isFlight = transportType === 'flight';

  // Initialize filters with defaults or current values
  const [filters, setFilters] = useState<TransportFilters>({
    escales: params.currentFilters?.escales ?? 0,
    departureTimeStart: params.currentFilters?.departureTimeStart ?? 0, // 00:00
    departureTimeEnd: params.currentFilters?.departureTimeEnd ?? 1440, // 24:00
    arrivalTimeStart: params.currentFilters?.arrivalTimeStart ?? 0,
    arrivalTimeEnd: params.currentFilters?.arrivalTimeEnd ?? 1440,
    durationMin: params.currentFilters?.durationMin ?? 0,
    durationMax: params.currentFilters?.durationMax ?? 1440, // 24 hours max
    selectedAirlines: params.currentFilters?.selectedAirlines ?? [],
    selectedCompanies: params.currentFilters?.selectedCompanies ?? [],
    rating: params.currentFilters?.rating ?? 0,
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleApply = () => {
    if (params.onApply) {
      params.onApply(filters);
    }
    navigation.goBack();
  };

  const handleReset = () => {
    setFilters({
      escales: 0,
      departureTimeStart: 0,
      departureTimeEnd: 1440,
      arrivalTimeStart: 0,
      arrivalTimeEnd: 1440,
      durationMin: 0,
      durationMax: 1440,
      selectedAirlines: [],
      selectedCompanies: [],
      rating: 0,
    });
  };

  const formatEscales = (value: number): string => {
    return `${value} escale${value > 1 ? 's' : ''}`;
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const themeColor = isFlight ? colors.transport.flight.primary : colors.transport.train.primary;

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <DetailHeader
        title="Filtres"
        onBack={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Escales Slider */}
        <RangeSlider
          label="Escales"
          min={0}
          max={10}
          value={filters.escales}
          onValueChange={(value: number) => setFilters({ ...filters, escales: Math.round(value) })}
          formatValue={formatEscales}
        />

        {/* Departure Time Range */}
        <TimeRangeSlider
          label="Heures de départ"
          minTime={0}
          maxTime={1440}
          startTime={filters.departureTimeStart}
          endTime={filters.departureTimeEnd}
          onStartTimeChange={(time: number) => setFilters({ ...filters, departureTimeStart: Math.round(time) })}
          onEndTimeChange={(time: number) => setFilters({ ...filters, departureTimeEnd: Math.round(time) })}
        />

        {/* Arrival Time Range */}
        <TimeRangeSlider
          label="Heures d'arrivée"
          minTime={0}
          maxTime={1440}
          startTime={filters.arrivalTimeStart}
          endTime={filters.arrivalTimeEnd}
          onStartTimeChange={(time: number) => setFilters({ ...filters, arrivalTimeStart: Math.round(time) })}
          onEndTimeChange={(time: number) => setFilters({ ...filters, arrivalTimeEnd: Math.round(time) })}
        />

        {/* Duration Range */}
        <TimeRangeSlider
          label="Durée"
          minTime={0}
          maxTime={1440}
          startTime={filters.durationMin}
          endTime={filters.durationMax}
          onStartTimeChange={(time: number) => setFilters({ ...filters, durationMin: Math.round(time) })}
          onEndTimeChange={(time: number) => setFilters({ ...filters, durationMax: Math.round(time) })}
        />

        {/* Airlines/Companies Checkboxes */}
        {isFlight ? (
          <CheckboxList
            label="Compagnies aériennes"
            options={FLIGHT_AIRLINES}
            selectedIds={filters.selectedAirlines}
            onSelectionChange={(ids: string[]) => setFilters({ ...filters, selectedAirlines: ids })}
          />
        ) : (
          <CheckboxList
            label="Compagnies ferroviaires"
            options={TRAIN_COMPANIES}
            selectedIds={filters.selectedCompanies}
            onSelectionChange={(ids: string[]) => setFilters({ ...filters, selectedCompanies: ids })}
          />
        )}

        {/* Rating Selector */}
        <RatingSelector
          label="Rating"
          selectedRating={filters.rating}
          onRatingChange={(rating: number) => setFilters({ ...filters, rating })}
        />

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
            activeOpacity={0.7}
          >
            <Text style={styles.resetButtonText}>Réinitialiser</Text>
          </TouchableOpacity>

          <Button
            title="Appliquer"
            onPress={handleApply}
            variant="primary"
            size="large"
            fullWidth
            backgroundColor={themeColor}
            style={styles.applyButton}
          />
        </View>
      </ScrollView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.base,
    paddingBottom: spacing['4xl'],
  },
  actionsContainer: {
    marginTop: spacing.lg,
    gap: spacing.base,
  },
  resetButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
  },
  resetButtonText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
  },
  applyButton: {
    marginTop: spacing.base,
  },
});

