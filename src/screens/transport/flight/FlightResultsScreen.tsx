/**
 * FlightResultsScreen
 * Flight results list with date filter and trip type filter
 * Uses OverlayHeader with integrated date calendar and tab filters
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
  DateFilterBar,
  TripTypeFilter,
  FlightCard,
} from '../../../components/transport';
import type { TripType } from '../../../components/transport/filters/TripTypeFilter';
import { OverlayHeader } from '../../../components/transport/headers/OverlayHeader';
import { SkeletonTransportCard } from '../../../components/skeleton';
import { colors, spacing, typography } from '../../../theme';
import { images } from '../../../config';
import { useFlightData, useHideTabBar } from '../../../hooks';
import type { SearchContext } from '../../../types/transport';

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

// Header height constant - matches FlightSearchScreen
const HEADER_HEIGHT = 300;

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

  // Build section title with origin and destination
  const sectionTitle = params.origin && params.destination
    ? `${t('transport.flight.search.allFlights', { origin: params.origin, destination: params.destination })}`
    : t('transport.flight.search.availableFlights');

  return (
    <View style={styles.container}>
      {/* OverlayHeader with integrated date calendar and tab filters */}
      <OverlayHeader
        title={t('transport.flight.title')}
        onBack={handleBack}
        // Left icon - matching FlightSearchScreen style
        leftIconName="chevron-back"
        leftIconFamily="ionicons"
        leftIconSize={20}
        leftIconColor={colors.text.primary}
        leftIconWithContainer={true}
        // Right icon - calendar icon
        rightIconName="calendar-outline"
        rightIconFamily="ionicons"
        rightIconSize={20}
        rightIconColor={colors.primary.normal}
        rightIconWithContainer={true}
        onRightIconPress={() => navigation.navigate('HomeMain')}
        backgroundColor={colors.transport.flight.primary}
        backgroundImage={images.mapVector}
        backgroundImageOpacity={0.8}
        headerHeight={HEADER_HEIGHT}
        navBarPaddingTop={0}
        imageBackgroundStyle={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        {/* Date Filter Bar - integrated in header */}
        <DateFilterBar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          month={currentMonth}
          onMonthChange={handleMonthChange}
          containerStyle={styles.dateFilterContainer}
          iconColor={colors.text.inverse}
          monthTextColor={colors.text.inverse}
        />

        {/* Trip Type Filter - integrated in header */}
        <TripTypeFilter
          selectedType={selectedTripType}
          onTypeChange={setSelectedTripType}
          containerStyle={styles.tripFilterContainer}
        />
      </OverlayHeader>

      {/* Flight List Section */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: HEADER_HEIGHT + spacing.base },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{sectionTitle}</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.searchText}>{t('transport.flight.search.searchButton')}</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            // Show skeleton loaders while loading
            <>
              <SkeletonTransportCard isFlight={true} style={styles.flightCard} />
              <SkeletonTransportCard isFlight={true} style={styles.flightCard} />
              <SkeletonTransportCard isFlight={true} style={styles.flightCard} />
              <SkeletonTransportCard isFlight={true} style={styles.flightCard} />
            </>
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
            <Text style={styles.emptyText}>{t('transport.flight.search.noFlights') || 'Aucun vol disponible'}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.transport.flight.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing['4xl'],
  },
  dateFilterContainer: {
    backgroundColor: 'transparent', // Transparent since it's inside the header
    paddingVertical: spacing.sm,
  },
  tripFilterContainer: {
    paddingTop: 0,
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
  emptyText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
