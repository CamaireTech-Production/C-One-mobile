/**
 * FlightSearchScreen
 * Flight search form with origin, destination, date, passengers
 * Simple white background design matching screenshot 1
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
  TransportInputField,
  CalendarModal,
} from '../../../components/transport';
import type { City } from '../../../components/transport';
import { colors, spacing, typography } from '../../../theme';
import { useGeolocation, useHideTabBar } from '../../../hooks';
import { Icon } from '../../../components/common/icons/Icon';
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

  // Get today's date as default
  const getTodayDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Format date for display (e.g., "Sun, Feb 04")
  const formatDateDisplay = (dateStr: string): string => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const year = parseInt(parts[2]);
      const date = new Date(year, month, day);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${days[date.getDay()]}, ${months[month]} ${String(day).padStart(2, '0')}`;
    }
    return dateStr;
  };

  // Form state
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState<string>(getTodayDate());
  const [passengers, setPassengers] = useState<number>(6);
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false);

  // Hide tab bar when this screen is focused
  useHideTabBar();

  // Pre-fill origin if client-location context
  useEffect(() => {
    if (context === 'client-location' && geolocationLocation?.city) {
      // Format as "Quebec QBC" if we have city
      const cityName = geolocationLocation.city;
      const cityCode = cityName.substring(0, 3).toUpperCase();
      setOrigin(`${cityName} ${cityCode}`);
    }
  }, [context, geolocationLocation]);

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

  const handleSwapOriginDestination = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleOriginPress = () => {
    navigation.navigate('DestinationSelection', {
      transportType: 'flight',
      onDestinationSelect: (city: City) => {
        setOrigin(city.name);
      },
    });
  };

  const handleDestinationPress = () => {
    navigation.navigate('DestinationSelection', {
      transportType: 'flight',
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

  const handlePassengerDecrease = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  };

  const handlePassengerIncrease = () => {
    setPassengers(passengers + 1);
  };

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <DetailHeader
        title={t('transport.flight.reservation') || 'Réservation vols'}
        onBack={handleBack}
        rightIconName="airplane"
        rightIconFamily="ionicons"
        onRightIconPress={() => navigation.navigate('HomeMain')}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* MA POSITION */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>MA POSITION</Text>
          <TransportInputField
            type="text"
            label=""
            value={origin}
            onChangeText={setOrigin}
            onPress={handleOriginPress}
            placeholder="Quebec QBC"
            containerStyle={styles.inputField}
            iconName="airplane-takeoff"
            iconFamily="materialcommunity"
            iconColor={colors.transport.flight.primary}
            backgroundColor={colors.background.primary}
            editable={!handleOriginPress}
          />
        </View>

        {/* À (Destination) with Swap Icon */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>À</Text>
          <View style={styles.destinationRow}>
            <View style={styles.destinationInputWrapper}>
              <TransportInputField
                type="text"
                label=""
                value={destination}
                onChangeText={setDestination}
                onPress={handleDestinationPress}
                placeholder="Ma destination"
                containerStyle={styles.inputField}
                iconName="airplane-landing"
                iconFamily="materialcommunity"
                iconColor={colors.transport.flight.primary}
                backgroundColor={colors.background.primary}
                editable={!handleDestinationPress}
              />
            </View>
            <TouchableOpacity
              style={styles.swapButton}
              onPress={handleSwapOriginDestination}
              activeOpacity={0.7}
            >
              <Icon
                name="swap-vertical"
                size={24}
                color={colors.transport.flight.primary}
                family="ionicons"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* DATE DE DEPART */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>DATE DE DEPART</Text>
          <TransportInputField
            type="text"
            label=""
            value={formatDateDisplay(date)}
            onPress={handleDatePress}
            placeholder="Sélectionner une date"
            containerStyle={styles.inputField}
            iconName="calendar-outline"
            iconFamily="ionicons"
            iconColor={colors.transport.flight.primary}
            backgroundColor={colors.background.primary}
            editable={false}
          />
        </View>

        {/* NOMBRE DE PASSAGERS */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>NOMBRE DE PASSAGERS</Text>
          <View style={styles.passengerRow}>
            <View style={styles.passengerInputWrapper}>
              <Text style={styles.passengerPlaceholder}>
                Sélectionner un nombre
              </Text>
            </View>
            <View style={styles.passengerControls}>
              <TouchableOpacity
                style={styles.passengerButton}
                onPress={handlePassengerDecrease}
                activeOpacity={0.7}
              >
                <Icon
                  name="remove-circle-outline"
                  size={24}
                  color={colors.transport.flight.primary}
                  family="ionicons"
                />
              </TouchableOpacity>
              <Text style={styles.passengerCount}>
                {String(passengers).padStart(2, '0')}
              </Text>
              <TouchableOpacity
                style={styles.passengerButton}
                onPress={handlePassengerIncrease}
                activeOpacity={0.7}
              >
                <Icon
                  name="add-circle-outline"
                  size={24}
                  color={colors.transport.flight.primary}
                  family="ionicons"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Rechercher Button */}
        <Button
          title={t('transport.common.search') || 'Rechercher'}
          onPress={handleSearch}
          variant="primary"
          size="large"
          fullWidth
          style={styles.searchButton}
          backgroundColor={colors.transport.flight.primary}
        />
      </ScrollView>

      {/* Calendar Modal */}
      <CalendarModal
        visible={showCalendarModal}
        selectedDate={date}
        onDateSelect={handleDateSelect}
        onClose={() => setShowCalendarModal(false)}
        primaryColor={colors.transport.flight.primary}
      />
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.styles.bodyRegular12,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  inputField: {
    marginBottom: 0,
  },
  destinationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  destinationInputWrapper: {
    flex: 1,
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  passengerInputWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  passengerPlaceholder: {
    ...typography.styles.bodyRegular16,
    color: colors.text.tertiary,
  },
  passengerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  passengerButton: {
    padding: spacing.xs,
  },
  passengerCount: {
    ...typography.styles.bodyBold18,
    color: colors.text.primary,
    minWidth: 30,
    textAlign: 'center',
  },
  searchButton: {
    marginTop: spacing.xl,
  },
});

