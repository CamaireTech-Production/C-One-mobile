/**
 * useGeolocation Hook
 * Manages geolocation permissions, position retrieval, and reverse geocoding
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import * as Location from 'expo-location';
import { reverseGeocode } from '../services/geolocationService';
import {
  saveLocationCache,
  getLocationCache,
  clearLocationCache,
} from '../services/geolocationCache';

export type GeolocationStatus = 
  | 'idle' 
  | 'requesting' 
  | 'granted' 
  | 'denied' 
  | 'error' 
  | 'success';

export interface LocationData {
  latitude: number;
  longitude: number;
  countryCode?: string;
  countryName?: string;
  city?: string;
  region?: string;
}

export interface UseGeolocationOptions {
  accuracy?: Location.Accuracy;
  timeout?: number; // Timeout in milliseconds
  autoRequest?: boolean; // Automatically request location on mount
  cacheTTL?: number; // Cache TTL in milliseconds (default: 24h)
  useCache?: boolean; // Whether to use cache (default: true)
}

export interface UseGeolocationReturn {
  status: GeolocationStatus;
  location: LocationData | null;
  error: string | null;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<LocationData | null>;
  clearError: () => void;
  recheckPermissions: () => Promise<boolean>;
}

export const useGeolocation = (
  options: UseGeolocationOptions = {}
): UseGeolocationReturn => {
  const {
    accuracy = Location.Accuracy.Balanced,
    timeout = 15000, // 15 seconds default
    autoRequest = false,
    cacheTTL = 24 * 60 * 60 * 1000, // 24 hours default
    useCache = true,
  } = options;

  const [status, setStatus] = useState<GeolocationStatus>('idle');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  /**
   * Load cached location on mount if available
   */
  useEffect(() => {
    const loadCachedLocation = async () => {
      if (!useCache || isInitializedRef.current) {
        return;
      }

      try {
        const cachedLocation = await getLocationCache();
        if (cachedLocation) {
          setLocation(cachedLocation);
          setStatus('success');
          isInitializedRef.current = true;
        }
      } catch (err) {
        // Silently fail, we'll fetch fresh data if needed
        console.warn('Failed to load cached location:', err);
      }
    };

    loadCachedLocation();
  }, [useCache]);

  /**
   * Clear any pending timeout
   */
  const clearTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  /**
   * Request location permission
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setStatus('requesting');
      setError(null);

      // Check if location services are enabled
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        setStatus('error');
        setError('Les services de localisation sont désactivés. Veuillez les activer dans les paramètres.');
        return false;
      }

      // Check current permission status
      const { status: currentStatus } = await Location.getForegroundPermissionsAsync();

      if (currentStatus === 'granted') {
        setStatus('granted');
        return true;
      }

      if (currentStatus === 'denied') {
        setStatus('denied');
        setError('Permission de localisation refusée. Veuillez l\'activer dans les paramètres.');
        return false;
      }

      // Request permission
      const { status: newStatus } = await Location.requestForegroundPermissionsAsync();

      if (newStatus === 'granted') {
        setStatus('granted');
        return true;
      }

      setStatus('denied');
      setError('Permission de localisation refusée.');
      return false;
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Erreur lors de la demande de permission de localisation.');
      return false;
    }
  }, []);

  /**
   * Get current location with reverse geocoding
   */
  const getCurrentLocation = useCallback(async (): Promise<LocationData | null> => {
    try {
      // Check cache first if enabled
      if (useCache) {
        const cachedLocation = await getLocationCache();
        if (cachedLocation) {
          console.log('🌍 [useGeolocation] Using cached location:', {
            countryCode: cachedLocation.countryCode,
            countryName: cachedLocation.countryName,
            city: cachedLocation.city,
            coordinates: {
              latitude: cachedLocation.latitude,
              longitude: cachedLocation.longitude,
            },
          });
          setLocation(cachedLocation);
          setStatus('success');
          return cachedLocation;
        } else {
          console.log('🌍 [useGeolocation] No valid cache found, fetching new location');
        }
      }

      setStatus('requesting');
      setError(null);

      // First, ensure we have permission
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        return null;
      }

      // Set timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutRef.current = setTimeout(() => {
          reject(new Error('Timeout: La récupération de la localisation a pris trop de temps.'));
        }, timeout);
      });

      // Get current position
      const locationPromise = Location.getCurrentPositionAsync({
        accuracy,
      });

      const position = await Promise.race([locationPromise, timeoutPromise]);
      clearTimeout();

      const { latitude, longitude } = position.coords;

      console.log('🌍 [useGeolocation] GPS coordinates detected:', {
        latitude,
        longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
      });

      // Perform reverse geocoding using the service
      let locationData: LocationData = {
        latitude,
        longitude,
      };

      try {
        const geocodeResult = await reverseGeocode({ latitude, longitude });

        if (geocodeResult) {
          locationData = {
            ...locationData,
            countryCode: geocodeResult.countryCode,
            countryName: geocodeResult.countryName,
            city: geocodeResult.city,
            region: geocodeResult.region,
          };

          console.log('🌍 [useGeolocation] Location data after reverse geocoding:', {
            countryCode: locationData.countryCode,
            countryName: locationData.countryName,
            city: locationData.city,
            region: locationData.region,
            coordinates: { latitude, longitude },
          });
        } else {
          console.warn('🌍 [useGeolocation] Reverse geocoding returned no result');
        }
      } catch (geocodeError: any) {
        // If reverse geocoding fails, we still return the coordinates
        console.error('🌍 [useGeolocation] Reverse geocoding failed:', geocodeError);
        // Don't set error here, as we still have valid coordinates
      }

      setLocation(locationData);
      setStatus('success');

      // Save to cache if enabled
      if (useCache) {
        try {
          await saveLocationCache(locationData, cacheTTL);
          console.log('🌍 [useGeolocation] Location saved to cache');
        } catch (cacheError) {
          // Don't fail the whole operation if cache save fails
          console.warn('🌍 [useGeolocation] Failed to save location to cache:', cacheError);
        }
      }

      console.log('🌍 [useGeolocation] Final location data returned:', locationData);
      return locationData;
    } catch (err: any) {
      clearTimeout();
      setStatus('error');
      
      // Handle specific error cases
      if (err.message?.includes('Timeout')) {
        setError('La récupération de la localisation a pris trop de temps. Veuillez réessayer.');
      } else if (err.message?.includes('network')) {
        setError('Erreur réseau. Vérifiez votre connexion internet.');
      } else if (err.message?.includes('VPN')) {
        setError('Veuillez désactiver votre VPN pour utiliser la géolocalisation.');
      } else {
        setError(err.message || 'Erreur lors de la récupération de la localisation.');
      }
      
      return null;
    }
  }, [requestPermission, accuracy, timeout, clearTimeout]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
    if (status === 'error') {
      setStatus('idle');
    }
  }, [status]);

  /**
   * Re-check permissions (useful when app comes back to foreground)
   */
  const recheckPermissions = useCallback(async (): Promise<boolean> => {
    try {
      // Check if location services are enabled
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        return false;
      }

      // Check current permission status
      const { status: currentStatus } = await Location.getForegroundPermissionsAsync();

      if (currentStatus === 'granted') {
        // Permissions are now granted, clear any error state
        if (status === 'denied' || status === 'error') {
          setStatus('granted');
          setError(null);
        }
        return true;
      }

      return false;
    } catch (err) {
      console.warn('Failed to recheck permissions:', err);
      return false;
    }
  }, [status]);

  return {
    status,
    location,
    error,
    requestPermission,
    getCurrentLocation,
    clearError,
    recheckPermissions,
  };
};

