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
  originIconName,
  originIconFamily = 'ionicons',
  originIconColor,
  destinationIconName,
  destinationIconFamily = 'ionicons',
  destinationIconColor,
  originLabel,
  destinationLabel,
  dateLabel,
  passengersLabel,
  searchButtonLabel,
  originPlaceholder,
  destinationPlaceholder,
  datePlaceholder,
  primaryColor,
  iconColor: globalIconColor,
  buttonBackgroundColor,
  originPreFilled,
  containerStyle,
  cardStyle,
  showPassengers = true,
  passengersMin = 1,
  passengersMax = 10,
}) => {
  const { t } = useTranslation();
  
  // Simple linear color assignment
  let defaultPrimaryColor: string = colors.primary.normal;
  if (primaryColor) {
    defaultPrimaryColor = primaryColor;
  } else if (transportType === 'flight') {
    defaultPrimaryColor = colors.transport.flight.primary;
  } else if (transportType === 'train') {
    defaultPrimaryColor = colors.transport.train.primary;
  } else if (transportType === 'car') {
    defaultPrimaryColor = colors.transport.car.primary;
  }
  
  // Simple linear background color assignment
  let defaultSearchButtonBackground: string = colors.transport.flight.searchButtonBackground;
  if (buttonBackgroundColor) {
    defaultSearchButtonBackground = buttonBackgroundColor;
  } else if (transportType === 'flight') {
    defaultSearchButtonBackground = colors.transport.flight.searchButtonBackground;
  } else if (transportType === 'train') {
    defaultSearchButtonBackground = colors.transport.train.searchButtonBackground;
  } else if (transportType === 'car') {
    defaultSearchButtonBackground = colors.transport.car.searchButtonBackground;
  }
  
  const defaultSearchButtonTextColor: string = colors.primary.dark;
  
  const iconColor: string = globalIconColor || originIconColor || destinationIconColor || defaultPrimaryColor;
  
  // Simple linear input background color assignment
  let inputBackgroundColor: string = colors.secondary.light;
  if (transportType === 'train') {
    inputBackgroundColor = colors.transport.train.card;
  } else if (transportType === 'flight' || transportType === 'car') {
    inputBackgroundColor = colors.secondary.light;
  }
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Simple linear icon assignment
  let defaultOriginIcon: string = 'location';
  if (originIconName) {
    defaultOriginIcon = originIconName;
  } else if (transportType === 'flight') {
    defaultOriginIcon = 'airplane';
  } else if (transportType === 'train') {
    defaultOriginIcon = 'train';
  } else if (transportType === 'car') {
    defaultOriginIcon = 'car';
  }
  
  let defaultDestinationIcon: string = 'airplane';
  if (destinationIconName) {
    defaultDestinationIcon = destinationIconName;
  } else if (transportType === 'flight') {
    defaultDestinationIcon = 'airplane';
  } else if (transportType === 'train') {
    defaultDestinationIcon = 'train';
  } else if (transportType === 'car') {
    defaultDestinationIcon = 'car';
  }
  
  const getTranslationKey = (key: string) => {
    return `transport.${transportType}.search.${key}`;
  };
  
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
          iconName={defaultOriginIcon}
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
          iconName={defaultDestinationIcon}
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
          backgroundColor={defaultSearchButtonBackground}
          textColor={defaultSearchButtonTextColor}
          style={styles.searchButton}
          textStyle={styles.searchButtonText}
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
    marginBottom: spacing.md,
  },
  searchButton: {
    marginTop: spacing.base,
  },
  searchButtonText: {
    ...typography.styles.bodyBold24,
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
    marginTop: spacing.md,
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

