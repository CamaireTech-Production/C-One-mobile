/**
 * FlightResultsScreen
 * Flight results list with date filter and trip type filter
 */

import React, { useState, useMemo } from 'react';
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
} from '../../../components/common';
import {
  DateFilterBar,
  TripTypeFilter,
  FlightCard,
} from '../../../components/transport';
import { colors, spacing, typography } from '../../../theme';
import { useFlightData, useHideTabBar } from '../../../hooks';
import type { SearchContext, TripType } from '../../../types/transport';

interface FlightResultsScreenParams {
  countryCode: string;
  cityId?: string;
  context?: SearchContext;
  origin?: string;
  destination?: string;
  date?: string;
  passengers?: number;
}

type FlightResultsScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'FlightResults'
>;

export const FlightResultsScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<FlightResultsScreenNavigationProp>();
  const params = route.params as FlightResultsScreenParams;

  // Hide tab bar when this screen is focused
  useHideTabBar();

  const [selectedDate, setSelectedDate] = useState<string>(
    params.date || '17-11-2025'
  );
  const [selectedTripType, setSelectedTripType] = useState<TripType>('non-stop');
  const [currentMonth, setCurrentMonth] = useState<string>('Novembre');

  // Get flights data
  const { flights, loading } = useFlightData(
    params.countryCode,
    params.cityId,
    params.context || 'other-country'
  );

  // Filter flights
  const filteredFlights = useMemo(() => {
    let filtered = flights;

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(
        (flight) =>
          !flight.availableDates ||
          flight.availableDates.length === 0 ||
          flight.availableDates.includes(selectedDate)
      );
    }

    // Filter by trip type
    if (selectedTripType === 'non-stop') {
      filtered = filtered.filter((flight) => flight.isNonStop === true);
    } else {
      filtered = filtered.filter(
        (flight) => flight.isNonStop === false || (flight.stops && flight.stops.length > 0)
      );
    }

    // Filter by origin/destination if provided
    if (params.origin) {
      filtered = filtered.filter((flight) =>
        flight.origin.toLowerCase().includes(params.origin!.toLowerCase())
      );
    }

    if (params.destination) {
      filtered = filtered.filter((flight) =>
        flight.destination.toLowerCase().includes(params.destination!.toLowerCase())
      );
    }

    return filtered;
  }, [flights, selectedDate, selectedTripType, params.origin, params.destination]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    // Simple month navigation - can be enhanced
    const months = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ];
    const currentIndex = months.indexOf(currentMonth);
    if (direction === 'next' && currentIndex < months.length - 1) {
      setCurrentMonth(months[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      setCurrentMonth(months[currentIndex - 1]);
    }
  };

  const handleFlightPress = (offerId: string) => {
    const offer = flights.find((f) => f.id === offerId);
    if (offer) {
      navigation.navigate('FlightBooking', {
        offerId,
        offer,
      });
    }
  };

  return (
    <ScreenBackground backgroundColor={colors.transport.flight.background}>
      <DetailHeader
        title="Réservation - Details"
        onBack={handleBack}
        rightIconName="bookmark-outline"
        rightIconFamily="ionicons"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Filter Bar */}
        <DateFilterBar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          month={currentMonth}
          onMonthChange={handleMonthChange}
        />

        {/* Trip Type Filter */}
        <TripTypeFilter
          selectedType={selectedTripType}
          onTypeChange={setSelectedTripType}
        />

        {/* Results Section */}
        <View style={styles.resultsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Vols disponible</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.searchText}>Rechercher</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <Text style={styles.loadingText}>Chargement des vols...</Text>
          ) : filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                offer={flight}
                onReserve={() => handleFlightPress(flight.id)}
                style={styles.flightCard}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>Aucun vol disponible</Text>
          )}
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
    paddingBottom: spacing.lg,
  },
  resultsSection: {
    padding: spacing.base,
    backgroundColor: colors.background.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  sectionTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
  },
  searchText: {
    ...typography.styles.bodyMedium16,
    color: colors.primary.normal,
  },
  flightCard: {
    marginBottom: spacing.base,
  },
  loadingText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  emptyText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});

