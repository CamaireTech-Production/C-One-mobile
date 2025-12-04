/**
 * TrainResultsScreen
 * Train results list with date filter and trip type filter
 * Same structure as FlightResultsScreen but with gold theme
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
  TrainCard,
} from '../../../components/transport';
import { colors, spacing, typography } from '../../../theme';
import { useTrainData, useHideTabBar } from '../../../hooks';
import type { SearchContext, TripType } from '../../../types/transport';

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

export const TrainResultsScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<TrainResultsScreenNavigationProp>();
  const params = route.params as TrainResultsScreenParams;

  // Hide tab bar when this screen is focused
  useHideTabBar();

  const [selectedDate, setSelectedDate] = useState<string>(
    params.date || '17-11-2025'
  );
  const [selectedTripType, setSelectedTripType] = useState<TripType>('non-stop');
  const [currentMonth, setCurrentMonth] = useState<string>('Novembre');

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

  return (
    <ScreenBackground backgroundColor={colors.transport.train.background}>
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
        {/* Date Filter Bar - Gold Theme */}
        <View style={[styles.dateFilterContainer, { backgroundColor: colors.transport.train.header }]}>
          <DateFilterBar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={handleMonthChange}
          />
        </View>

        {/* Trip Type Filter */}
        <View style={styles.tripFilterContainer}>
          <TripTypeFilter
            selectedType={selectedTripType}
            onTypeChange={setSelectedTripType}
          />
        </View>

        {/* Results Section */}
        <View style={styles.resultsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trains disponible</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.searchText}>Rechercher</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <Text style={styles.loadingText}>Chargement des trains...</Text>
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
            <Text style={styles.emptyText}>Aucun train disponible</Text>
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
  dateFilterContainer: {
    paddingVertical: spacing.base,
  },
  tripFilterContainer: {
    backgroundColor: colors.transport.train.header,
    paddingBottom: spacing.sm,
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

