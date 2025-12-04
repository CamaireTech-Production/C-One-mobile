/**
 * TransportSearchForm Component
 * Reusable search form for transport (Flight, Train, Car)
 * Supports customizable icons, colors, and labels
 * Matches Figma design exactly
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, shadows } from '../../../theme';
import { LocationInputField } from './LocationInputField';
import { DateInputField } from './DateInputField';
import { PassengerCounter } from './PassengerCounter';
import { Button } from '../../common/forms/Button';

export type TransportType = 'flight' | 'train' | 'car';

export interface TransportSearchFormProps {
  // Transport type
  transportType: TransportType;
  
  // Form values
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  
  // Form handlers
  onOriginChange: (text: string) => void;
  onDestinationChange: (text: string) => void;
  onDateChange: (date: string) => void;
  onPassengersChange: (count: number) => void;
  onSearch: () => void;
  
  // Customization - Icons
  originIconName?: string;
  originIconFamily?: 'ionicons' | 'material' | 'fontawesome' | 'fontawesome6' | 'materialcommunity';
  originIconColor?: string;
  destinationIconName?: string;
  destinationIconFamily?: 'ionicons' | 'material' | 'fontawesome' | 'fontawesome6' | 'materialcommunity';
  destinationIconColor?: string;
  
  // Customization - Labels
  originLabel?: string;
  destinationLabel?: string;
  dateLabel?: string;
  passengersLabel?: string;
  searchButtonLabel?: string;
  
  // Customization - Placeholders
  originPlaceholder?: string;
  destinationPlaceholder?: string;
  datePlaceholder?: string;
  
  // Customization - Colors
  primaryColor?: string; // Color for icons and button
  iconColor?: string; // Global icon color (overrides originIconColor and destinationIconColor if provided)
  buttonBackgroundColor?: string;
  
  // Pre-filled values
  originPreFilled?: string;
  
  // Layout
  containerStyle?: ViewStyle;
  cardStyle?: ViewStyle;
  
  // Other props
  showPassengers?: boolean; // For car, might not need passengers
  passengersMin?: number;
  passengersMax?: number;
}

export const TransportSearchForm: React.FC<TransportSearchFormProps> = ({
  transportType,
  origin,
  destination,
  date,
  passengers,
  onOriginChange,
  onDestinationChange,
  onDateChange,
  onPassengersChange,
  onSearch,
  // Icons
  originIconName,
  originIconFamily = 'ionicons',
  originIconColor,
  destinationIconName,
  destinationIconFamily = 'ionicons',
  destinationIconColor,
  // Labels
  originLabel,
  destinationLabel,
  dateLabel,
  passengersLabel,
  searchButtonLabel,
  // Placeholders
  originPlaceholder,
  destinationPlaceholder,
  datePlaceholder,
  // Colors
  primaryColor,
  iconColor: globalIconColor,
  buttonBackgroundColor,
  // Pre-filled
  originPreFilled,
  // Layout
  containerStyle,
  cardStyle,
  // Other
  showPassengers = true,
  passengersMin = 1,
  passengersMax = 10,
}) => {
  const { t } = useTranslation();
  
  // Get default colors based on transport type
  const getDefaultPrimaryColor = () => {
    if (primaryColor) return primaryColor;
    switch (transportType) {
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
  
  const defaultPrimaryColor = getDefaultPrimaryColor();
  // Use global iconColor if provided, otherwise use individual colors or default
  const iconColor = globalIconColor || originIconColor || destinationIconColor || defaultPrimaryColor;
  
  // Get default icons based on transport type
  const getDefaultOriginIcon = () => {
    if (originIconName) return originIconName;
    switch (transportType) {
      case 'flight':
        return 'airplane'; // Airplane taking off
      case 'train':
        return 'train';
      case 'car':
        return 'car';
      default:
        return 'location';
    }
  };
  
  const getDefaultDestinationIcon = () => {
    if (destinationIconName) return destinationIconName;
    switch (transportType) {
      case 'flight':
        return 'airplane'; // Airplane landing/in flight
      case 'train':
        return 'train';
      case 'car':
        return 'car';
      default:
        return 'airplane';
    }
  };
  
  // Get translation keys based on transport type
  const getTranslationKey = (key: string) => {
    return `transport.${transportType}.search.${key}`;
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.card, cardStyle]}>
        {/* Origin Input */}
        <LocationInputField
          type="position"
          label={originLabel || t(getTranslationKey('positionLabel'))}
          value={origin}
          onChangeText={onOriginChange}
          placeholder={originPlaceholder || t(getTranslationKey('positionPlaceholder'))}
          preFilledValue={originPreFilled}
          containerStyle={styles.inputField}
          iconName={originIconName || getDefaultOriginIcon()}
          iconFamily={originIconFamily}
          iconColor={iconColor}
        />
        
        {/* Destination Input */}
        <LocationInputField
          type="destination"
          label={destinationLabel || t(getTranslationKey('destinationLabel'))}
          value={destination}
          onChangeText={onDestinationChange}
          placeholder={destinationPlaceholder || t(getTranslationKey('destinationPlaceholder'))}
          containerStyle={styles.inputField}
          iconName={destinationIconName || getDefaultDestinationIcon()}
          iconFamily={destinationIconFamily}
          iconColor={iconColor}
        />
        
        {/* Date Input */}
        <DateInputField
          label={dateLabel || t(getTranslationKey('dateLabel'))}
          value={date}
          onChange={onDateChange}
          placeholder={datePlaceholder || t(getTranslationKey('datePlaceholder'))}
          containerStyle={styles.inputField}
          iconColor={iconColor}
        />
        
        {/* Passengers Counter */}
        {showPassengers && (
          <PassengerCounter
            label={passengersLabel || t(getTranslationKey('passengersLabel'))}
            value={passengers}
            onChange={onPassengersChange}
            min={passengersMin}
            max={passengersMax}
            containerStyle={styles.inputField}
          />
        )}
        
        {/* Search Button */}
        <Button
          title={searchButtonLabel || t(getTranslationKey('title'))}
          onPress={onSearch}
          variant="primary"
          size="large"
          fullWidth
          style={{
            ...styles.searchButton,
            ...(buttonBackgroundColor ? { backgroundColor: buttonBackgroundColor } : {}),
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    padding: spacing.lg,
    ...shadows.medium,
    elevation: 8,
  },
  inputField: {
    marginBottom: spacing.base,
  },
  searchButton: {
    marginTop: spacing.base,
  },
});

