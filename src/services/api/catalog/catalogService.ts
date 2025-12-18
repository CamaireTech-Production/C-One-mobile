/**
 * Catalog Service
 * Handles all catalog-related API calls including featured countries,
 * nearby locations, and location autocomplete/search.
 */

import apiClient from '../apiClient';
import { ENDPOINTS } from '../endpoints';
import type {
  FeaturedCountriesResponse,
  NearbyLocationsResponse,
  AutocompleteResponse,
} from '../types';

export const catalogService = {
  /**
   * Get featured countries for the "others" tab on home screen
   * Returns countries marked as featured by the editorial team
   */
  getFeaturedCountries: async (): Promise<FeaturedCountriesResponse> => {
    // apiClient already handles Accept header and Authorization via interceptors
    // No need to pass headers for GET requests
    const response = await apiClient.get(ENDPOINTS.catalog.featuredCountries);
    return response.data;
  },

  /**
   * Get nearby locations based on user coordinates
   * Returns popular cities/locations within 1000km radius
   * 
   * @param lat - Latitude (should be rounded to 2 decimals)
   * @param lng - Longitude (should be rounded to 2 decimals)
   */
  getNearbyLocations: async (
    lat: number,
    lng: number
  ): Promise<NearbyLocationsResponse> => {
    // apiClient already handles Accept header and Authorization via interceptors
    // No need to pass headers for GET requests
    const response = await apiClient.get(ENDPOINTS.catalog.nearby, {
      params: { lat, lng },
    });
    return response.data;
  },

  /**
   * Search locations using autocomplete
   * Returns location suggestions based on search query
   * 
   * @param query - Search query string (min 2 characters required by backend)
   */
  searchLocations: async (
    query: string
  ): Promise<AutocompleteResponse> => {
    // apiClient already handles Accept header and Authorization via interceptors
    // No need to pass headers for GET requests
    const response = await apiClient.get(ENDPOINTS.catalog.autocomplete, {
      params: { query },
    });
    return response.data;
  },
};

