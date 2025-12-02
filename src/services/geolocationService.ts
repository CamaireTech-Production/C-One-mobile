/**
 * Geolocation Service
 * Service for reverse geocoding and location-related utilities
 */

import * as Location from 'expo-location';

export interface ReverseGeocodeResult {
  countryCode?: string;
  countryName?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  street?: string;
  streetNumber?: string;
  formattedAddress?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Reverse geocode coordinates to get address information
 * @param coordinates - Latitude and longitude
 * @returns Address information including country, city, region, etc.
 */
export const reverseGeocode = async (
  coordinates: Coordinates
): Promise<ReverseGeocodeResult | null> => {
  try {
    const { latitude, longitude } = coordinates;

    console.log('📍 [GeolocationService] Reverse geocoding coordinates:', {
      latitude,
      longitude,
    });

    const reverseGeocodeResult = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (!reverseGeocodeResult || reverseGeocodeResult.length === 0) {
      console.warn('📍 [GeolocationService] No reverse geocoding result found');
      return null;
    }

    const address = reverseGeocodeResult[0];

    const result = {
      countryCode: address.isoCountryCode || undefined,
      countryName: address.country || undefined,
      city: address.city || address.subAdministrativeArea || undefined,
      region: address.region || address.administrativeArea || undefined,
      postalCode: address.postalCode || undefined,
      street: address.street || undefined,
      streetNumber: address.streetNumber || undefined,
      formattedAddress: address.formattedAddress || undefined,
    };

    console.log('📍 [GeolocationService] Reverse geocoding result:', {
      countryCode: result.countryCode,
      countryName: result.countryName,
      city: result.city,
      region: result.region,
      formattedAddress: result.formattedAddress,
      rawAddress: address,
    });

    return result;
  } catch (error: any) {
    console.error('📍 [GeolocationService] Reverse geocoding failed:', error);
    return null;
  }
};

/**
 * Get country code from coordinates
 * @param coordinates - Latitude and longitude
 * @returns ISO country code (e.g., 'CM', 'FR', 'US') or null
 */
export const getCountryCode = async (
  coordinates: Coordinates
): Promise<string | null> => {
  const result = await reverseGeocode(coordinates);
  return result?.countryCode || null;
};

/**
 * Get city name from coordinates
 * @param coordinates - Latitude and longitude
 * @returns City name or null
 */
export const getCityName = async (
  coordinates: Coordinates
): Promise<string | null> => {
  const result = await reverseGeocode(coordinates);
  return result?.city || null;
};

/**
 * Check if coordinates are within a specific country
 * @param coordinates - Latitude and longitude
 * @param countryCode - ISO country code to check (e.g., 'CM', 'FR')
 * @returns True if coordinates are in the specified country
 */
export const isInCountry = async (
  coordinates: Coordinates,
  countryCode: string
): Promise<boolean> => {
  const detectedCountryCode = await getCountryCode(coordinates);
  return detectedCountryCode?.toUpperCase() === countryCode.toUpperCase();
};


