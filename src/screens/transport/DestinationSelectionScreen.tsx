/**
 * DestinationSelectionScreen
 * Full-screen destination picker that integrates DestinationSelector component
 * Used for selecting flight/train destinations
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types';

import {
  ScreenBackground,
  DetailHeader,
} from '../../components/common';
import {
  DestinationSelector,
  type City,
} from '../../components/transport';
import { colors, spacing, typography } from '../../theme';
import { useHideTabBar } from '../../hooks';

interface DestinationSelectionScreenParams {
  transportType: 'flight' | 'train' | 'car';
  onDestinationSelect: (city: City) => void;
  currentDestination?: string;
}

type DestinationSelectionScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'DestinationSelection'
>;

export const DestinationSelectionScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<DestinationSelectionScreenNavigationProp>();
  const params = route.params as DestinationSelectionScreenParams;

  // Hide tab bar when this screen is focused
  useHideTabBar();

  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    // Call the callback if provided
    if (params.onDestinationSelect) {
      params.onDestinationSelect(city);
    }
    // Navigate back after selection
    navigation.goBack();
  };

  const getTitle = () => {
    switch (params.transportType) {
      case 'flight':
        return t('transport.flight.search.destinationTitle') || 'Sélectionner une destination';
      case 'train':
        return t('transport.train.search.destinationTitle') || 'Sélectionner une destination';
      case 'car':
        return t('transport.car.search.destinationTitle') || 'Sélectionner une destination';
      default:
        return 'Sélectionner une destination';
    }
  };

  const getIconColor = () => {
    switch (params.transportType) {
      case 'flight':
        return colors.transport.flight.primary;
      case 'train':
        return colors.transport.train.primary;
      case 'car':
        return colors.transport.car.primary;
      default:
        return colors.primary.normal;
    }
  };

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <DetailHeader
        title={getTitle()}
        onBack={handleBack}
      />

      <DestinationSelector
        cities={[]} // Will be populated from API or data source
        selectedCity={selectedCity}
        onCitySelect={handleCitySelect}
        transportType={params.transportType}
        iconColor={getIconColor()}
      />
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

