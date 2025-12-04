/**
 * FlightSearchScreen
 * Flight search form with origin, destination, date, passengers
 * Supports context: client-location (ma position) or other-country
 */

import React, { useState, useEffect, useRef } from 'react';
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
import { SkeletonTransportCard } from '../../../components/skeleton';
import { colors, spacing, typography, shadows } from '../../../theme';
import { images } from '../../../config';
import { useFlightData, useGeolocation, useHideTabBar } from '../../../hooks';
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

// Header and form positioning constants
// Based on Figma design: header is ~350px, form overlaps by ~150px
const HEADER_HEIGHT = 350;
const FORM_OVERLAP_OFFSET = 140; // How much the form overlaps the header
const FORM_TOP_POSITION = HEADER_HEIGHT - FORM_OVERLAP_OFFSET; // ~200px from top

export const FlightSearchScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<FlightSearchScreenNavigationProp>();
  const params = route.params as FlightSearchScreenParams;

  // Refs for measuring component heights
  const formCardRef = useRef<View>(null);
  const [formCardHeight, setFormCardHeight] = useState<number>(280); // Estimated initial height
  const [formCardTop, setFormCardTop] = useState<number>(FORM_TOP_POSITION);

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

  // Hide tab bar when this screen is focused
  useHideTabBar();

  // Pre-fill origin if client-location context
  useEffect(() => {
    if (context === 'client-location' && geolocationLocation?.city) {
      setOrigin(geolocationLocation.city);
    }
  }, [context, geolocationLocation]);

  // Measure form card height and position dynamically
  const handleFormCardLayout = (event: any) => {
    const { height, y } = event.nativeEvent.layout;
    if (height > 0 && height !== formCardHeight) {
      setFormCardHeight(height);
    }
    // y should match FORM_TOP_POSITION, but we measure it to be sure
    if (y > 0 && Math.abs(y - formCardTop) > 1) {
      setFormCardTop(y);
    }
  };

  const scrollContentPaddingTop = formCardTop + formCardHeight + spacing.sm;

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
        navBarPaddingTop={0}
        imageBackgroundStyle={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />

      {/* Search Form Card - Positioned absolutely to overlap header */}
      <View 
        ref={formCardRef}
        style={styles.formCardWrapper}
        onLayout={handleFormCardLayout}
      >
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
          originIconName="airplane-takeoff"
          originIconFamily="materialcommunity"
          destinationIconName="airplane-landing"
          destinationIconFamily="materialcommunity"
          iconColor={colors.transport.flight.primary}
          containerStyle={styles.formCard}
        />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { 
            paddingTop: scrollContentPaddingTop || (FORM_TOP_POSITION + 280 + spacing.lg), // Fallback calculation
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Preview Flights Section */}
        <View style={styles.previewSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {origin && destination
                ? t('transport.flight.search.allFlights', { origin, destination })
                : t('transport.flight.search.availableFlights')}
            </Text>
            {!loading && (
              <TouchableOpacity onPress={handleSeeAll} activeOpacity={0.7}>
                <Text style={styles.seeAllText}>{t('transport.flight.search.seeAll')}</Text>
              </TouchableOpacity>
            )}
          </View>

          {loading ? (
            // Show skeleton loaders while loading
            <>
              <SkeletonTransportCard isFlight={true} style={styles.previewCard} />
              <SkeletonTransportCard isFlight={true} style={styles.previewCard} />
              <SkeletonTransportCard isFlight={true} style={styles.previewCard} />
            </>
          ) : previewFlights.length > 0 ? (
            previewFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                offer={flight}
                onReserve={() => handleFlightPress(flight.id)}
                style={styles.previewCard}
              />
            ))
          ) : null}
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
    paddingHorizontal: spacing.base,
    paddingBottom: spacing['4xl'],
  },
  formCardWrapper: {
    position: 'absolute',
    top: FORM_TOP_POSITION, // Position from top of screen (~200px)
    left: spacing.base,
    right: spacing.base,
    zIndex: 10, // Form overlaps header background (zIndex: 1-2) but stays below header content (zIndex: 100)
    elevation: 4, // Android shadow/elevation
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

