/**
 * Hooks - Central Export
 * Export all custom hooks from here
 */

export { useFonts } from './useFonts';
export { useFadeAnimation } from './useFadeAnimation';
export { useScaleAnimation } from './useScaleAnimation';
export { useSlideAnimation } from './useSlideAnimation';
export { useHomeData } from './useHomeData';
export { useGeolocation } from './useGeolocation';
export type { 
  GeolocationStatus, 
  LocationData, 
  UseGeolocationOptions, 
  UseGeolocationReturn 
} from './useGeolocation';
export { useHotelData } from './useHotelData';
export { useTourismData } from './useTourismData';
export { useRestaurantData } from './useRestaurantData';
export { useTransportData } from './useTransportData';
export { useHideTabBar } from './useHideTabBar';
// Transport hooks
export { useFlightData } from './transport/useFlightData';
export { useTrainData } from './transport/useTrainData';
export { useCarData } from './transport/useCarData';
export { useTransportSearch } from './transport/useTransportSearch';
// Catalog hooks
export { useFeaturedCountries } from './useFeaturedCountries';
export type { UseFeaturedCountriesReturn } from './useFeaturedCountries';
export { useNearbyLocations } from './useNearbyLocations';
export type { UseNearbyLocationsOptions, UseNearbyLocationsReturn } from './useNearbyLocations';

