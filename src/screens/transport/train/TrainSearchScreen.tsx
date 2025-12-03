/**
 * TrainSearchScreen
 * Train search form with origin, destination, date, passengers
 * Same structure as FlightSearchScreen but with gold theme
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
import {
  LocationInputField,
  DateInputField,
  PassengerCounter,
  TrainCard,
} from '../../../components/transport';
import { colors, spacing, typography } from '../../../theme';
import { useTrainData, useGeolocation } from '../../../hooks';
import type { SearchContext } from '../../../types/transport';

interface TrainSearchScreenParams {
  countryCode: string;
  cityId?: string;
  context?: SearchContext;
}

type TrainSearchScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'TrainSearch'
>;

export const TrainSearchScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<TrainSearchScreenNavigationProp>();
  const params = route.params as TrainSearchScreenParams;

  // Determine context
  const { location: geolocationLocation } = useGeolocation({ useCache: true });
  const context: SearchContext =
    params.context ||
    (geolocationLocation?.countryCode === params.countryCode
      ? 'client-location'
      : 'other-country');

  // Form state
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState<string>('10-11-2025');
  const [passengers, setPassengers] = useState<number>(6);

  // Get trains data
  const { trains, loading } = useTrainData(
    params.countryCode,
    params.cityId,
    context
  );

  // Pre-fill origin if client-location context
  useEffect(() => {
    if (context === 'client-location' && geolocationLocation?.city) {
      setOrigin(geolocationLocation.city);
    }
  }, [context, geolocationLocation]);

  // Get preview trains (first 2-3)
  const previewTrains = trains.slice(0, 3);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    navigation.navigate('TrainResults', {
      countryCode: params.countryCode,
      cityId: params.cityId,
      context,
      origin,
      destination,
      date,
      passengers,
    });
  };

  const handleSeeAll = () => {
    handleSearch();
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
        title={t('transport.train.title')}
        onBack={handleBack}
        rightIconName="home"
        rightIconFamily="ionicons"
        onRightIconPress={() => navigation.navigate('HomeMain')}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {t('transport.train.description')}
          </Text>
        </View>

        {/* Search Form Card */}
        <View style={styles.formCard}>
          <LocationInputField
            type="position"
            label={t('transport.train.search.positionLabel')}
            value={origin}
            onChangeText={setOrigin}
            preFilledValue={
              context === 'client-location' && geolocationLocation?.city
                ? geolocationLocation.city
                : undefined
            }
            placeholder={t('transport.train.search.positionPlaceholder')}
          />

          <LocationInputField
            type="destination"
            label={t('transport.train.search.destinationLabel')}
            value={destination}
            onChangeText={setDestination}
            placeholder={t('transport.train.search.destinationPlaceholder')}
          />

          <DateInputField
            label={t('transport.train.search.dateLabel')}
            value={date}
            onChange={setDate}
            placeholder={t('transport.train.search.datePlaceholder')}
          />

          <PassengerCounter
            label={t('transport.train.search.passengersLabel')}
            value={passengers}
            onChange={setPassengers}
            min={1}
            max={10}
          />

          <Button
            title={t('transport.train.search.title')}
            onPress={handleSearch}
            variant="primary"
            size="large"
            fullWidth
            style={[styles.searchButton, { backgroundColor: colors.transport.train.primary }]}
          />
        </View>

        {/* Preview Trains Section */}
        {previewTrains.length > 0 && (
          <View style={styles.previewSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('transport.train.search.availableTrains')}</Text>
              <TouchableOpacity onPress={handleSeeAll} activeOpacity={0.7}>
                <Text style={styles.seeAllText}>{t('transport.train.search.seeAll')}</Text>
              </TouchableOpacity>
            </View>

            {previewTrains.map((train) => (
              <TrainCard
                key={train.id}
                offer={train}
                onReserve={() => handleTrainPress(train.id)}
                style={styles.previewCard}
              />
            ))}
          </View>
        )}
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
  },
  titleContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.styles.h3,
    color: colors.text.primary,
  },
  formCard: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...colors.shadow.card,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchButton: {
    marginTop: spacing.base,
  },
  previewSection: {
    marginTop: spacing.base,
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
  seeAllText: {
    ...typography.styles.bodyMedium16,
    color: colors.transport.train.primary,
  },
  previewCard: {
    marginBottom: spacing.base,
  },
});

