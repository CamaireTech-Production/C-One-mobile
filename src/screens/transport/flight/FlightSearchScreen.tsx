/**
 * FlightSearchScreen
 * Flight search form with origin, destination, date, passengers
 * Supports context: client-location (ma position) or other-country
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
  FlightCard,
} from '../../../components/transport';
import { colors, spacing, typography } from '../../../theme';
import { useFlightData, useGeolocation } from '../../../hooks';
import type { SearchContext } from '../../../types/transport';

interface FlightSearchScreenParams {
  countryCode: string;
  cityId?: string;
  context?: SearchContext;
}

type FlightSearchScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'FlightSearch'
>;

export const FlightSearchScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<FlightSearchScreenNavigationProp>();
  const params = route.params as FlightSearchScreenParams;

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

  // Get flights data
  const { flights, loading } = useFlightData(
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

  // Get preview flights (first 2-3)
  const previewFlights = flights.slice(0, 3);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    navigation.navigate('FlightResults', {
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
        title="Réservation - avion"
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
            Découvrez les meilleurs vol pour vous
          </Text>
        </View>

        {/* Search Form Card */}
        <View style={styles.formCard}>
          <LocationInputField
            type="position"
            label="Ma position"
            value={origin}
            onChangeText={setOrigin}
            preFilledValue={
              context === 'client-location' && geolocationLocation?.city
                ? geolocationLocation.city
                : undefined
            }
            placeholder="Entrer votre adresse"
          />

          <LocationInputField
            type="destination"
            label="Ma destination"
            value={destination}
            onChangeText={setDestination}
            placeholder="Entrer votre destination"
          />

          <DateInputField
            label="Date"
            value={date}
            onChange={setDate}
            placeholder="10-11-2025"
          />

          <PassengerCounter
            label="Nombre de passagers"
            value={passengers}
            onChange={setPassengers}
            min={1}
            max={10}
          />

          <Button
            title="Rechercher"
            onPress={handleSearch}
            variant="primary"
            size="large"
            fullWidth
            style={styles.searchButton}
          />
        </View>

        {/* Preview Flights Section */}
        {previewFlights.length > 0 && (
          <View style={styles.previewSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Vols disponible</Text>
              <TouchableOpacity onPress={handleSeeAll} activeOpacity={0.7}>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </TouchableOpacity>
            </View>

            {previewFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                offer={flight}
                onReserve={() => handleFlightPress(flight.id)}
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
    color: colors.primary.normal,
  },
  previewCard: {
    marginBottom: spacing.base,
  },
});

