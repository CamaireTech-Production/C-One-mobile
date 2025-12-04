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
  TransportSearchForm,
  FlightCard,
} from '../../../components/transport';
import { OverlayHeader } from '../../../components/transport/headers/OverlayHeader';
import { colors, spacing, typography, shadows } from '../../../theme';
import { images } from '../../../config';
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

const HEADER_HEIGHT = 350;
const FORM_OVERLAP_OFFSET = 150;

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
      <OverlayHeader
        title={t('transport.flight.title')}
        subtitle={t('transport.flight.subtitle')}
        onBack={handleBack}
        // Left icon - matching DetailHeader style
        leftIconName="chevron-back"
        leftIconFamily="ionicons"
        leftIconSize={20}
        leftIconColor={colors.text.primary}
        leftIconWithContainer={true}
        // Right icon - matching DetailHeader style
        rightIconName="smart-toy"
        rightIconFamily="material"
        rightIconSize={20}
        rightIconColor={colors.primary.normal}
        rightIconWithContainer={true}
        onRightIconPress={() => navigation.navigate('HomeMain')}
        backgroundColor={colors.transport.flight.primary}
        backgroundImage={images.mapVector}
        backgroundImageOpacity={0.8}
        headerHeight={HEADER_HEIGHT}
        navBarPaddingTop={spacing.lg}
        imageBackgroundStyle={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />

      {/* Search Form Card - Positioned absolutely to overlap header */}
      <View style={styles.formCardWrapper}>
        <TransportSearchForm
          transportType="flight"
          origin={origin}
          destination={destination}
          date={date}
          passengers={passengers}
          onOriginChange={setOrigin}
          onDestinationChange={setDestination}
          onDateChange={setDate}
          onPassengersChange={setPassengers}
          onSearch={handleSearch}
          originPreFilled={
            context === 'client-location' && geolocationLocation?.city
              ? geolocationLocation.city
              : undefined
          }
          originIconName="airplane"
          destinationIconName="airplane"
          iconColor={colors.transport.flight.primary}
          containerStyle={styles.formCard}
        />
      </View>

      {/* Scrollable Content - Starts below the form card */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Preview Flights Section */}
        {previewFlights.length > 0 && (
          <View style={styles.previewSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {origin && destination
                  ? t('transport.flight.search.allFlights', { origin, destination })
                  : t('transport.flight.search.availableFlights')}
              </Text>
              <TouchableOpacity onPress={handleSeeAll} activeOpacity={0.7}>
                <Text style={styles.seeAllText}>{t('transport.flight.search.seeAll')}</Text>
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
    paddingTop: 280,
    paddingHorizontal: spacing.base,
    paddingBottom: spacing['4xl'],
  },
  formCardWrapper: {
    position: 'absolute',
    top: HEADER_HEIGHT - FORM_OVERLAP_OFFSET, // Position from top of screen (adjust based on header height)
    left: spacing.base,
    right: spacing.base,
    zIndex: 1000,
  },
  formCard: {
    // Styles are handled by TransportSearchForm component
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

