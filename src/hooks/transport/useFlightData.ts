import { useEffect, useState } from 'react';

import { homeData } from '../../data/data';
import type { TransportOffer, SearchContext } from '../../types/transport';

interface UseFlightDataOptions {
  delay?: number;
}

/**
 * Hook to fetch and filter flight data based on context
 * 
 * Context logic (Précision Technique 100):
 * - 'client-location': Shows flights from client's country OR between cities of client's country
 * - 'other-country': Shows flights ONLY between cities of the selected country (not inter-country)
 */
export const useFlightData = (
  countryCode: string,
  cityId?: string,
  context: SearchContext = 'other-country',
  options: UseFlightDataOptions = {}
) => {
  const { delay = 500 } = options;
  const [flights, setFlights] = useState<TransportOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timeout = setTimeout(() => {
      if (isMounted) {
        // Filter flights based on context
        const filtered = homeData.transportOffers.flights.filter((flight) => {
          // Must be a plane type
          if (flight.type !== 'plane') {
            return false;
          }

          if (context === 'client-location') {
            // Scénario 1: A partir de la localisation du client
            // Show flights from client's country OR between cities of client's country
            // If cityId is provided, show flights specific to that city
            // If no cityId, show flights available for the entire country
            
            if (flight.countryId !== countryCode) {
              return false;
            }

            if (cityId) {
              // Show flights specific to the city
              return flight.cityId === cityId;
            } else {
              // Show flights available for the entire country (national flights)
              return !flight.cityId || flight.cityId === undefined;
            }
          } else {
            // Scénario 3: Sur la base d'un autre pays complément
            // Show flights ONLY between cities of the selected country
            // NOT inter-country flights
            
            if (flight.countryId !== countryCode) {
              return false;
            }

            // For other-country context, show flights between cities of that country
            // If cityId is provided, filter by city
            // If no cityId, show all flights within the country
            if (cityId) {
              return flight.cityId === cityId;
            } else {
              // Show all flights within the selected country (inter-city flights)
              return true; // All flights within the country
            }
          }
        });

        setFlights(filtered);
        setLoading(false);
      }
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [countryCode, cityId, context, delay]);

  const refresh = () => {
    setLoading(true);
    setFlights([]);
    setTimeout(() => {
      const filtered = homeData.transportOffers.flights.filter((flight) => {
        if (flight.type !== 'plane') {
          return false;
        }

        if (context === 'client-location') {
          if (flight.countryId !== countryCode) {
            return false;
          }

          if (cityId) {
            return flight.cityId === cityId;
          } else {
            return !flight.cityId || flight.cityId === undefined;
          }
        } else {
          if (flight.countryId !== countryCode) {
            return false;
          }

          if (cityId) {
            return flight.cityId === cityId;
          } else {
            return true;
          }
        }
      });

      setFlights(filtered);
      setLoading(false);
    }, delay);
  };

  return {
    flights,
    loading,
    refresh,
  };
};

