/**
 * DestinationSelector Component
 * Searchable city list with transport-type icons for destination selection
 * Used in transport search forms
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

export interface City {
  id: string;
  name: string;
  code?: string; // Airport/Station code
  country?: string;
}

export interface DestinationSelectorProps {
  cities: City[];
  selectedCity?: City;
  onCitySelect: (city: City) => void;
  onSearch?: (query: string) => void;
  transportType?: 'flight' | 'train' | 'car';
  placeholder?: string;
  containerStyle?: ViewStyle;
  iconColor?: string;
}

// Mock popular cities - in production, this would come from an API
const POPULAR_CITIES: City[] = [
  { id: 'paris', name: 'Paris', code: 'CDG', country: 'France' },
  { id: 'bordeaux', name: 'Bordeaux', code: 'BOD', country: 'France' },
  { id: 'lyon', name: 'Lyon', code: 'LYS', country: 'France' },
  { id: 'marseille', name: 'Marseille', code: 'MRS', country: 'France' },
  { id: 'nice', name: 'Nice', code: 'NCE', country: 'France' },
  { id: 'toulouse', name: 'Toulouse', code: 'TLS', country: 'France' },
  { id: 'london', name: 'London', code: 'LHR', country: 'UK' },
  { id: 'newyork', name: 'New York', code: 'NYC', country: 'USA' },
  { id: 'montreal', name: 'Montreal', code: 'YUL', country: 'Canada' },
  { id: 'toronto', name: 'Toronto', code: 'YYZ', country: 'Canada' },
];

export const DestinationSelector: React.FC<DestinationSelectorProps> = ({
  cities = POPULAR_CITIES,
  selectedCity,
  onCitySelect,
  onSearch,
  transportType = 'flight',
  placeholder = 'Rechercher une destination...',
  containerStyle,
  iconColor,
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Get icon based on transport type
  const getTransportIcon = () => {
    switch (transportType) {
      case 'flight':
        return 'airplane';
      case 'train':
        return 'train';
      case 'car':
        return 'car';
      default:
        return 'location';
    }
  };

  const finalIconColor = iconColor || colors.primary.normal;

  // Filter cities based on search query
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) {
      return cities;
    }
    const query = searchQuery.toLowerCase();
    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(query) ||
        city.code?.toLowerCase().includes(query) ||
        city.country?.toLowerCase().includes(query)
    );
  }, [cities, searchQuery]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  const handleCityPress = (city: City) => {
    onCitySelect(city);
  };

  const renderCityItem = ({ item }: { item: City }) => {
    const isSelected = selectedCity?.id === item.id;

    return (
      <TouchableOpacity
        style={[styles.cityItem, isSelected && styles.cityItemSelected]}
        onPress={() => handleCityPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cityIconContainer}>
          <Icon
            name={getTransportIcon()}
            size={20}
            color={isSelected ? colors.text.inverse : finalIconColor}
            family={transportType === 'flight' ? 'materialcommunity' : 'ionicons'}
          />
        </View>
        <View style={styles.cityInfo}>
          <Text style={[styles.cityName, isSelected && styles.cityNameSelected]}>
            {item.name}
          </Text>
          {item.code && (
            <Text style={[styles.cityCode, isSelected && styles.cityCodeSelected]}>
              {item.code}
            </Text>
          )}
        </View>
        {item.country && (
          <Text style={[styles.cityCountry, isSelected && styles.cityCountrySelected]}>
            {item.country}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon
            name="search"
            size={20}
            color={colors.text.secondary}
            family="ionicons"
          />
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={handleSearchChange}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              activeOpacity={0.7}
            >
              <Icon name="close-circle" size={20} color={colors.text.secondary} family="ionicons" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Cities List */}
      <FlatList
        data={filteredCities}
        renderItem={renderCityItem}
        keyExtractor={(item) => item.id}
        style={styles.citiesList}
        contentContainerStyle={styles.citiesListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucune destination trouvée</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  searchContainer: {
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    borderRadius: 12,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.styles.input,
    color: colors.text.primary,
    paddingVertical: 0,
  },
  citiesList: {
    flex: 1,
  },
  citiesListContent: {
    padding: spacing.base,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: 12,
    marginBottom: spacing.sm,
    backgroundColor: colors.background.tertiary,
  },
  cityItemSelected: {
    backgroundColor: colors.primary.normal,
  },
  cityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.base,
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },
  cityNameSelected: {
    color: colors.text.inverse,
  },
  cityCode: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
  },
  cityCodeSelected: {
    color: colors.text.inverse,
    opacity: 0.8,
  },
  cityCountry: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  cityCountrySelected: {
    color: colors.text.inverse,
    opacity: 0.8,
  },
  emptyContainer: {
    padding: spacing['2xl'],
    alignItems: 'center',
  },
  emptyText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
  },
});

