/**
 * TrainSearchScreen
 * Train search form with origin, destination, date, passengers
 * Same structure as FlightSearchScreen but with gold theme
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
  TrainCard,
  CalendarModal,
} from '../../../components/transport';
import { OverlayHeader } from '../../../components/transport/headers/OverlayHeader';
import type { City } from '../../../components/transport';
import { SkeletonTransportCard } from '../../../components/skeleton';
import { colors, spacing, typography, shadows } from '../../../theme';
import { images } from '../../../config';
import { useTrainData, useGeolocation, useHideTabBar } from '../../../hooks';
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

// Header and form positioning constants
// Based on Figma design: header is ~350px, form overlaps by ~150px
const HEADER_HEIGHT = 350;
const FORM_OVERLAP_OFFSET = 140; // How much the form overlaps the header
const FORM_TOP_POSITION = HEADER_HEIGHT - FORM_OVERLAP_OFFSET; // ~200px from top

export const TrainSearchScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<TrainSearchScreenNavigationProp>();
  const params = route.params as TrainSearchScreenParams;

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

  // Get today's date as default
  const getTodayDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Form state
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState<string>(getTodayDate());
  const [passengers, setPassengers] = useState<number>(6);
  const [isOneWay, setIsOneWay] = useState<boolean>(true);
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false);

  // Get trains data
  const { trains, loading } = useTrainData(
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
    // Get today's date for "Voir tout"
    const getTodayDate = (): string => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      return `${day}-${month}-${year}`;
    };
    
    navigation.navigate('TrainResults', {
      countryCode: params.countryCode,
      cityId: params.cityId,
      context,
      origin,
      destination,
      date: getTodayDate(), // Use today's date for "Voir tout"
      passengers,
    });
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

  const handleDestinationPress = () => {
    navigation.navigate('DestinationSelection', {
      transportType: 'train',
      currentDestination: destination,
      onDestinationSelect: (city: City) => {
        setDestination(city.name);
      },
    });
  };

  const handleDatePress = () => {
    setShowCalendarModal(true);
  };

  const handleDateSelect = (selectedDate: string) => {
    setDate(selectedDate);
    setShowCalendarModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Special Header with Background */}
      <OverlayHeader
        title={t('transport.train.title')}
        subtitle={t('transport.train.description')}
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
        backgroundColor={colors.transport.train.primary}
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
          transportType="train"
          origin={origin}
          destination={destination}
          date={date}
          passengers={passengers}
          onOriginChange={setOrigin}
          onDestinationChange={setDestination}
          onDateChange={handleDateSelect}
          onDatePress={handleDatePress}
          onPassengersChange={(passengers) => {
            if (typeof passengers === 'number') {
              setPassengers(passengers);
            }
          }}
          onSearch={handleSearch}
          isOneWay={isOneWay}
          onOneWayChange={setIsOneWay}
          onDestinationPress={handleDestinationPress}
          originPreFilled={
            context === 'client-location' && geolocationLocation?.city
              ? geolocationLocation.city
              : undefined
          }
          originIconName="train"
          originIconFamily="ionicons"
          destinationIconName="train"
          destinationIconFamily="ionicons"
          iconColor={colors.transport.train.primary}
          containerStyle={styles.formCard}
          destinationPlaceholder="Sélectionner une destination"
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
        {/* Preview Trains Section */}
        <View style={styles.previewSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {origin && destination
                ? t('transport.train.search.allTrains', { origin, destination })
                : t('transport.train.search.availableTrains')}
            </Text>
            {!loading && (
              <TouchableOpacity onPress={handleSeeAll} activeOpacity={0.7}>
                <Text style={styles.seeAllText}>{t('transport.train.search.seeAll')}</Text>
              </TouchableOpacity>
            )}
          </View>

          {loading ? (
            // Show skeleton loaders while loading
            <>
              <SkeletonTransportCard isFlight={false} style={styles.previewCard} />
              <SkeletonTransportCard isFlight={false} style={styles.previewCard} />
              <SkeletonTransportCard isFlight={false} style={styles.previewCard} />
            </>
          ) : previewTrains.length > 0 ? (
            previewTrains.map((train) => (
              <TrainCard
                key={train.id}
                offer={train}
                onReserve={() => handleTrainPress(train.id)}
                style={styles.previewCard}
              />
            ))
          ) : null}
        </View>
      </ScrollView>

      {/* Calendar Modal */}
      <CalendarModal
        visible={showCalendarModal}
        selectedDate={date}
        onDateSelect={handleDateSelect}
        onClose={() => setShowCalendarModal(false)}
        primaryColor={colors.transport.train.primary}
      />
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
    color: colors.transport.train.primary,
  },
  previewCard: {
    marginBottom: spacing.base,
  },
});
