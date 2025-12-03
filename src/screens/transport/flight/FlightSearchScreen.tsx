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
  Button,
} from '../../../components/common';
import {
  LocationInputField,
  DateInputField,
  PassengerCounter,
  FlightCard,
} from '../../../components/transport';
import { FlightSearchHeader } from '../../../components/transport/headers/FlightSearchHeader';
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
    <View style={styles.container}>
      {/* Special Header with Background */}
      <FlightSearchHeader
        title="Réservation - avion"
        subtitle="Découvrez les meilleurs vol pour vous"
        onBack={handleBack}
        rightIconName="home"
        rightIconFamily="ionicons"
        onRightIconPress={() => navigation.navigate('HomeMain')}
        backgroundColor={colors.transport.flight.primary}
        backgroundImage={undefined} // TODO: Add background image URL from Figma
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Form Card - Overlaps on header background */}
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
              <Text style={styles.sectionTitle}>
                {origin && destination
                  ? `Tous les vols ${origin} - ${destination}`
                  : 'Vols disponible'}
              </Text>
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
    paddingTop: 0, // No top padding - form overlaps header
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.base,
  },
  formCard: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.lg,
    marginTop: -spacing.xl, // Negative margin to overlap header
    marginBottom: spacing.lg,
    ...colors.shadow.card,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
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

