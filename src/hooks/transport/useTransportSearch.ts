import { useState, useCallback } from 'react';

import type { TransportOffer, TransportSearchCriteria, SearchContext } from '../../types/transport';
import { useFlightData } from './useFlightData';
import { useTrainData } from './useTrainData';

interface UseTransportSearchOptions {
  delay?: number;
}

/**
 * Hook to manage transport search functionality
 * Handles search criteria (origin, destination, date, passengers) and filters results
 */
export const useTransportSearch = (
  countryCode: string,
  cityId?: string,
  context: SearchContext = 'other-country',
  options: UseTransportSearchOptions = {}
) => {
  const [searchCriteria, setSearchCriteria] = useState<TransportSearchCriteria | null>(null);
  const [results, setResults] = useState<TransportOffer[]>([]);
  const [loading, setLoading] = useState(false);

  // Get base data
  const { flights, loading: flightsLoading } = useFlightData(countryCode, cityId, context, options);
  const { trains, loading: trainsLoading } = useTrainData(countryCode, cityId, context, options);

  /**
   * Perform search based on criteria
   */
  const search = useCallback(
    (criteria: TransportSearchCriteria) => {
      setLoading(true);
      setSearchCriteria(criteria);

      // Combine flights and trains
      const allOffers: TransportOffer[] = [...flights, ...trains];

      // Filter by search criteria
      const filtered = allOffers.filter((offer) => {
        // Filter by origin (case insensitive, partial match)
        const originMatch =
          !criteria.origin ||
          offer.origin.toLowerCase().includes(criteria.origin.toLowerCase());

        // Filter by destination (case insensitive, partial match)
        const destinationMatch =
          !criteria.destination ||
          offer.destination.toLowerCase().includes(criteria.destination.toLowerCase());

        // Filter by date (if availableDates includes the search date)
        const dateMatch =
          !criteria.date ||
          !offer.availableDates ||
          offer.availableDates.length === 0 ||
          offer.availableDates.includes(criteria.date);

        // Filter by passengers (check if offer supports the number of passengers)
        const passengersMatch =
          !criteria.passengers ||
          offer.passengersIncluded >= criteria.passengers;

        return originMatch && destinationMatch && dateMatch && passengersMatch;
      });

      // Simulate API delay
      setTimeout(() => {
        setResults(filtered);
        setLoading(false);
      }, options.delay || 300);
    },
    [flights, trains, options.delay]
  );

  /**
   * Clear search and reset results
   */
  const clearSearch = useCallback(() => {
    setSearchCriteria(null);
    setResults([]);
  }, []);

  /**
   * Filter results by trip type (Non stop / Transfer)
   */
  const filterByTripType = useCallback(
    (isNonStop: boolean) => {
      if (!searchCriteria) {
        return results;
      }

      return results.filter((offer) => {
        if (isNonStop) {
          return offer.isNonStop === true;
        } else {
          return offer.isNonStop === false || (offer.stops && offer.stops.length > 0);
        }
      });
    },
    [results, searchCriteria]
  );

  /**
   * Filter results by date
   */
  const filterByDate = useCallback(
    (date: string) => {
      if (!searchCriteria) {
        return results;
      }

      return results.filter((offer) => {
        return (
          !offer.availableDates ||
          offer.availableDates.length === 0 ||
          offer.availableDates.includes(date)
        );
      });
    },
    [results, searchCriteria]
  );

  return {
    searchCriteria,
    results,
    loading: loading || flightsLoading || trainsLoading,
    search,
    clearSearch,
    filterByTripType,
    filterByDate,
  };
};

