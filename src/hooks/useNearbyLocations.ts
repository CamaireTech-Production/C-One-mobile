/**
 * useNearbyLocations Hook
 * Fetches nearby locations from the catalog API based on user coordinates
 * Used in the "position" tab on home screen
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { catalogService } from '../services/api/catalog/catalogService';
import type { NearbyLocation } from '../services/api/types';
import { useAuth } from '../services/auth/authContext';

export interface UseNearbyLocationsOptions {
  lat: number | null;
  lng: number | null;
  enabled?: boolean; // Only fetch when enabled (default: true)
}

export interface UseNearbyLocationsReturn {
  locations: NearbyLocation[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

/**
 * Hook to fetch nearby locations based on user coordinates
 * 
 * @param lat - Latitude (will be rounded to 2 decimals internally)
 * @param lng - Longitude (will be rounded to 2 decimals internally)
 * @param enabled - Whether to fetch data (default: true)
 * 
 * Only fetches when:
 * - enabled is true
 * - Both lat and lng are not null
 * - Coordinates are valid (between -90/90 for lat, -180/180 for lng)
 */
export const useNearbyLocations = ({
  lat,
  lng,
  enabled = true,
}: UseNearbyLocationsOptions): UseNearbyLocationsReturn => {
  const { isAuthenticated } = useAuth();
  const [locations, setLocations] = useState<NearbyLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Validate and round coordinates to 2 decimal places
   */
  const validateAndRoundCoordinates = (
    latitude: number | null,
    longitude: number | null
  ): { lat: number; lng: number } | null => {
    if (latitude === null || longitude === null) {
      return null;
    }

    // Validate latitude range (-90 to 90)
    if (latitude < -90 || latitude > 90) {
      console.warn('Invalid latitude:', latitude);
      return null;
    }

    // Validate longitude range (-180 to 180)
    if (longitude < -180 || longitude > 180) {
      console.warn('Invalid longitude:', longitude);
      return null;
    }

    // Round to 2 decimal places as required by backend
    const roundedLat = Math.round(latitude * 100) / 100;
    const roundedLng = Math.round(longitude * 100) / 100;

    return { lat: roundedLat, lng: roundedLng };
  };

  useEffect(() => {
    // Only fetch if enabled and we have valid coordinates
    if (!enabled || lat === null || lng === null) {
      return;
    }

    let isMounted = true;

    const fetchNearby = async () => {
      const coords = validateAndRoundCoordinates(lat, lng);
      
      if (!coords) {
        if (isMounted) {
          setError(new Error('Invalid or missing coordinates'));
          setLoading(false);
        }
        return;
      }

      // Don't fetch if user is not authenticated
      if (!isAuthenticated) {
        if (isMounted) {
          setError(new Error('Authentication required'));
          setLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }
        
        const response = await catalogService.getNearbyLocations(
          coords.lat,
          coords.lng
        );
        
        if (isMounted) {
          setLocations(response.data);
        }
      } catch (err) {
        if (isMounted) {
          // Handle different error types
          if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            if (status === 401 || status === 403) {
              setError(new Error('Authentication required to view nearby locations'));
            } else if (status === 500) {
              setError(new Error('Server error. Please try again later.'));
            } else {
              setError(new Error(err.response?.data?.message || 'Failed to fetch nearby locations'));
            }
          } else {
            const errorMessage = err instanceof Error ? err : new Error('Failed to fetch nearby locations');
            setError(errorMessage);
          }
          console.error('Error fetching nearby locations:', err);
          // Keep previous data on error instead of clearing
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNearby();

    return () => {
      isMounted = false;
    };
  }, [lat, lng, enabled, isAuthenticated]);

  const refresh = async () => {
    if (!isAuthenticated) {
      setError(new Error('Authentication required'));
      return;
    }

    const coords = validateAndRoundCoordinates(lat, lng);
    
    if (!coords) {
      setError(new Error('Invalid or missing coordinates'));
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await catalogService.getNearbyLocations(
        coords.lat,
        coords.lng
      );
      
      setLocations(response.data);
    } catch (err) {
      // Handle different error types
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          setError(new Error('Authentication required to view nearby locations'));
        } else if (status === 500) {
          setError(new Error('Server error. Please try again later.'));
        } else {
          setError(new Error(err.response?.data?.message || 'Failed to fetch nearby locations'));
        }
      } else {
        const errorMessage = err instanceof Error ? err : new Error('Failed to fetch nearby locations');
        setError(errorMessage);
      }
      console.error('Error fetching nearby locations:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    locations,
    loading,
    error,
    refresh,
  };
};

