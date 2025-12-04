/**
 * TransportSearchForm Component
 * Reusable search form for transport (Flight, Train, Car)
 * Supports customizable icons, colors, and labels
 * Matches Figma design exactly
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, Modal, TouchableOpacity, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, shadows, typography } from '../../../theme';
import { TransportInputField } from './TransportInputField';
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
  
  // Get background color for input fields based on transport type
  const getInputBackgroundColor = () => {
    switch (transportType) {
      case 'train':
        return colors.transport.train.card; // Light gold background for train
      case 'flight':
      case 'car':
      default:
        return colors.secondary.light; // Light grey background for flight/car
    }
  };
  
  const inputBackgroundColor = getInputBackgroundColor();
  
  // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  
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
  
  // Date formatting helpers
  const formatDate = (dateString: string): string => {
    return dateString || datePlaceholder || '10-11-2025';
  };
  
  const handleDatePress = () => {
    setShowDatePicker(true);
  };
  
  const handleDateConfirm = (newDate: string) => {
    onDateChange(newDate);
    setShowDatePicker(false);
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.card, cardStyle]}>
        {/* Origin Input */}
        <TransportInputField
          type="text"
          label={originLabel || t(getTranslationKey('positionLabel'))}
          value={originPreFilled || origin}
          onChangeText={onOriginChange}
          placeholder={originPlaceholder || t(getTranslationKey('positionPlaceholder'))}
          containerStyle={styles.inputField}
          iconName={originIconName || getDefaultOriginIcon()}
          iconFamily={originIconFamily}
          iconColor={iconColor}
          backgroundColor={inputBackgroundColor}
        />
        
        {/* Destination Input */}
        <TransportInputField
          type="text"
          label={destinationLabel || t(getTranslationKey('destinationLabel'))}
          value={destination}
          onChangeText={onDestinationChange}
          placeholder={destinationPlaceholder || t(getTranslationKey('destinationPlaceholder'))}
          containerStyle={styles.inputField}
          iconName={destinationIconName || getDefaultDestinationIcon()}
          iconFamily={destinationIconFamily}
          iconColor={iconColor}
          backgroundColor={inputBackgroundColor}
        />
        
        {/* Date Input */}
        <TransportInputField
          type="text"
          label={dateLabel || t(getTranslationKey('dateLabel'))}
          value={formatDate(date)}
          onPress={handleDatePress}
          placeholder={datePlaceholder || t(getTranslationKey('datePlaceholder'))}
          containerStyle={styles.inputField}
          iconName="calendar-outline"
          iconFamily="ionicons"
          iconColor={iconColor}
          backgroundColor={inputBackgroundColor}
          editable={false}
        />
        
        {/* Passengers Counter */}
        {showPassengers && (
          <TransportInputField
            type="counter"
            label={passengersLabel || t(getTranslationKey('passengersLabel'))}
            value={passengers}
            onChange={onPassengersChange}
            min={passengersMin}
            max={passengersMax}
            containerStyle={styles.inputField}
            backgroundColor={inputBackgroundColor}
            formatValue={(val) => String(val).padStart(2, '0')}
          />
        )}
        
        {/* Search Button */}
        <Button
          title={searchButtonLabel || t(getTranslationKey('searchButton'))}
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
      
      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sélectionner une date</Text>
            <Text style={styles.modalHint}>
              Utilisez le format DD-MM-YYYY (ex: 10-11-2025)
            </Text>
            <View style={styles.modalInput}>
              <Text style={styles.modalLabel}>Date (DD-MM-YYYY)</Text>
              <View style={styles.modalInputContainer}>
                <TextInput
                  style={styles.modalTextInput}
                  value={date}
                  onChangeText={(text) => {
                    // Simple validation - you can enhance this
                    if (text.length <= 10) {
                      onDateChange(text);
                    }
                  }}
                  placeholder="DD-MM-YYYY"
                  placeholderTextColor={colors.text.tertiary}
                />
              </View>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowDatePicker(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.modalButtonTextCancel}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={() => handleDateConfirm(date)}
                activeOpacity={0.7}
              >
                <Text style={styles.modalButtonTextConfirm}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.lg,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  modalHint: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginBottom: spacing.base,
  },
  modalInput: {
    marginBottom: spacing.base,
  },
  modalLabel: {
    ...typography.styles.inputLabel,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  modalInputContainer: {
    backgroundColor: colors.background.tertiary,
    borderRadius: 12,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.normal,
  },
  modalTextInput: {
    ...typography.styles.input,
    color: colors.text.primary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.base,
    gap: spacing.base,
  },
  modalButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: colors.background.tertiary,
  },
  modalButtonConfirm: {
    backgroundColor: colors.primary.normal,
  },
  modalButtonTextCancel: {
    ...typography.styles.button,
    color: colors.text.primary,
  },
  modalButtonTextConfirm: {
    ...typography.styles.button,
    color: colors.text.inverse,
  },
});

