/**
 * TrainResultsScreen
 * Train results list with date filter and trip type filter
 * Uses OverlayHeader with integrated date calendar and tab filters
 * Same structure as FlightResultsScreen but with train theme
 */

import React, { useState, useMemo, useEffect } from 'react';
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
  TrainCard,
} from '../../../components/transport';
import type { TripType } from '../../../components/transport/filters/TripTypeFilter';
import { OverlayHeader } from '../../../components/transport/headers/OverlayHeader';
import { SkeletonTransportCard } from '../../../components/skeleton';
import { colors, spacing, typography } from '../../../theme';
import { images } from '../../../config';
import { useTrainData, useHideTabBar } from '../../../hooks';
import type { SearchContext } from '../../../types/transport';

interface TrainResultsScreenParams {
  countryCode: string;
  cityId?: string;
  context?: SearchContext;
  origin?: string;
  destination?: string;
  date?: string;
  passengers?: number;
}

type TrainResultsScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'TrainResults'
>;

// Header height constant - matches TrainSearchScreen
const HEADER_HEIGHT = 300;

export const TrainResultsScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<TrainResultsScreenNavigationProp>();
  const params = route.params as TrainResultsScreenParams;

  // Hide tab bar when this screen is focused
  useHideTabBar();

  // Get today's date as default
  const getTodayDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Get month name from date string (DD-MM-YYYY format)
  const getMonthFromDate = (dateString: string): string => {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
    ];
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const monthIndex = parseInt(parts[1], 10) - 1;
      return months[monthIndex] || months[new Date().getMonth()];
    }
    return months[new Date().getMonth()];
  };

  // Get current month name in French
  const getCurrentMonth = (): string => {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
    ];
    return months[new Date().getMonth()];
  };

  const defaultDate = params.date || getTodayDate();
  const defaultMonth = params.date ? getMonthFromDate(params.date) : getCurrentMonth();
  
  const [selectedDate, setSelectedDate] = useState<string>(defaultDate);
  const [selectedTripType, setSelectedTripType] = useState<TripType>('non-stop');
  const [currentMonth, setCurrentMonth] = useState<string>(defaultMonth);
  
  // Update month when date changes
  useEffect(() => {
    if (selectedDate) {
      const monthFromDate = getMonthFromDate(selectedDate);
      setCurrentMonth(monthFromDate);
    }
  }, [selectedDate]);

  // Get trains data
  const { trains, loading } = useTrainData(
    params.countryCode,
    params.cityId,
    params.context || 'other-country'
  );

  // Filter trains
  const filteredTrains = useMemo(() => {
    let filtered = trains;

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(
        (train) =>
          !train.availableDates ||
          train.availableDates.length === 0 ||
          train.availableDates.includes(selectedDate)
      );
    }

    // Filter by trip type
    if (selectedTripType === 'non-stop') {
      filtered = filtered.filter((train) => train.isNonStop === true);
    } else {
      filtered = filtered.filter(
        (train) => train.isNonStop === false || (train.stops && train.stops.length > 0)
      );
    }

    // Filter by origin/destination if provided
    if (params.origin) {
      filtered = filtered.filter((train) =>
        train.origin.toLowerCase().includes(params.origin!.toLowerCase())
      );
    }

    if (params.destination) {
      filtered = filtered.filter((train) =>
        train.destination.toLowerCase().includes(params.destination!.toLowerCase())
      );
    }

    return filtered;
  }, [trains, selectedDate, selectedTripType, params.origin, params.destination]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
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

  const handleTrainPress = (offerId: string) => {
    const offer = trains.find((t) => t.id === offerId);
    if (offer) {
      navigation.navigate('TrainBooking', {
        offerId,
        offer,
      });
    }
  };

  // Build section title with origin and destination
  const sectionTitle = params.origin && params.destination
    ? `${t('transport.train.search.allTrains', { origin: params.origin, destination: params.destination })}`
    : t('transport.train.search.availableTrains');

  return (
    <View style={styles.container}>
      {/* OverlayHeader with integrated date calendar and tab filters */}
      <OverlayHeader
        title={t('transport.train.title')}
        onBack={handleBack}
        // Left icon - matching TrainSearchScreen style
        leftIconName="chevron-back"
        leftIconFamily="ionicons"
        leftIconSize={20}
        leftIconColor={colors.text.primary}
        leftIconWithContainer={true}
        // Right icon - matching TrainSearchScreen style
        rightIconName="smart-toy"
        rightIconFamily="material"
        rightIconSize={20}
        rightIconColor={colors.primary.normal}
        rightIconWithContainer={true}
        onRightIconPress={() => navigation.navigate('HomeMain')}
        backgroundColor={colors.transport.train.primary}
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
          key={`${selectedDate}-${currentMonth}`} // Force re-render when date or month changes
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

      {/* Train List Section */}
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
              <Text style={styles.searchText}>{t('transport.train.search.searchButton')}</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            // Show skeleton loaders while loading
            <>
              <SkeletonTransportCard isFlight={false} style={styles.trainCard} />
              <SkeletonTransportCard isFlight={false} style={styles.trainCard} />
              <SkeletonTransportCard isFlight={false} style={styles.trainCard} />
              <SkeletonTransportCard isFlight={false} style={styles.trainCard} />
            </>
          ) : filteredTrains.length > 0 ? (
            filteredTrains.map((train) => (
              <TrainCard
                key={train.id}
                offer={train}
                onReserve={() => handleTrainPress(train.id)}
                style={styles.trainCard}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>{t('transport.train.search.noTrains') || 'Aucun train disponible'}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.transport.train.background,
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
    paddingHorizontal: 0, // Remove horizontal padding to allow full-width scroll
    marginHorizontal: -spacing.lg, // Negative margin to compensate for OverlayHeader childrenContainer padding
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
    color: colors.transport.train.primary,
  },
  trainCard: {
    marginBottom: spacing.base,
  },
  emptyText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
