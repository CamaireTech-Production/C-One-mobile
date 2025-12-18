/**
 * useFeaturedCountries Hook
 * Fetches featured countries from the catalog API for the "others" tab
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { catalogService } from '../services/api/catalog/catalogService';
import type { FeaturedCountry } from '../services/api/types';
import { useAuth } from '../services/auth/authContext';

export interface UseFeaturedCountriesReturn {
  countries: FeaturedCountry[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

/**
 * Hook to fetch featured countries from the catalog API
 * Automatically fetches on mount
 * Note: Requires user authentication (backend requires auth:sanctum)
 */
export const useFeaturedCountries = (): UseFeaturedCountriesReturn => {
  const { isAuthenticated } = useAuth();
  const [countries, setCountries] = useState<FeaturedCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCountries = async () => {
    // Don't fetch if user is not authenticated
    if (!isAuthenticated) {
      setLoading(false);
      setError(new Error('Authentication required'));
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await catalogService.getFeaturedCountries();
      setCountries(response.data);
    } catch (err) {
      // Handle different error types
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          setError(new Error('Authentication required to view featured countries'));
        } else if (status === 500) {
          setError(new Error('Server error. Please try again later.'));
        } else {
          setError(new Error(err.response?.data?.message || 'Failed to fetch featured countries'));
        }
      } else {
        const errorMessage = err instanceof Error ? err : new Error('Failed to fetch featured countries');
        setError(errorMessage);
      }
      console.error('Error fetching featured countries:', err);
      if (axios.isAxiosError(err)) {
        console.error('Request URL:', err.config?.url);
        console.error('Request method:', err.config?.method);
        console.error('Request headers:', err.config?.headers);
        console.error('Response status:', err.response?.status);
        console.error('Response data:', err.response?.data);
      }
      // Keep previous data on error instead of clearing
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadCountries = async () => {
      if (isMounted) {
        await fetchCountries();
      }
    };

    loadCountries();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const refresh = async () => {
    await fetchCountries();
  };

  return {
    countries,
    loading,
    error,
    refresh,
  };
};

