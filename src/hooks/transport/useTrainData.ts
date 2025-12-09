import { useEffect, useState } from 'react';

import { homeData } from '../../data/data';
import type { TransportOffer, SearchContext } from '../../types/transport';

interface UseTrainDataOptions {
  delay?: number;
}

/**
 * Hook to fetch and filter train data based on context
 * 
 * Context logic (Précision Technique 100):
 * - 'client-location': Shows trains from client's country OR between cities of client's country
 * - 'other-country': Shows trains ONLY between cities of the selected country (not inter-country)
 */
export const useTrainData = (
  countryCode: string,
  cityId?: string,
  context: SearchContext = 'other-country',
  options: UseTrainDataOptions = {}
) => {
  const { delay = 500 } = options;
  const [trains, setTrains] = useState<TransportOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timeout = setTimeout(() => {
      if (isMounted) {
        // Filter trains based on context (same logic as flights)
        const filtered = homeData.transportOffers.trains.filter((train) => {
          // Must be a train type
          if (train.type !== 'train') {
            return false;
          }

          if (context === 'client-location') {
            // Scénario 1: A partir de la localisation du client
            // Show trains from client's country OR between cities of client's country
            if (train.countryId !== countryCode) {
              return false;
            }

            if (cityId) {
              // Show trains specific to the city
              return train.cityId === cityId;
            } else {
              // Show trains available for the entire country (national trains)
              return !train.cityId || train.cityId === undefined;
            }
          } else {
            // Scénario 3: Sur la base d'un autre pays complément
            // Show trains ONLY between cities of the selected country
            if (train.countryId !== countryCode) {
              return false;
            }

            // For other-country context, show trains between cities of that country
            if (cityId) {
              return train.cityId === cityId;
            } else {
              // Show all trains within the selected country (inter-city trains)
              return true;
            }
          }
        });

        setTrains(filtered);
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
    setTrains([]);
    setTimeout(() => {
      const filtered = homeData.transportOffers.trains.filter((train) => {
        if (train.type !== 'train') {
          return false;
        }

        if (context === 'client-location') {
          if (train.countryId !== countryCode) {
            return false;
          }

          if (cityId) {
            return train.cityId === cityId;
          } else {
            return !train.cityId || train.cityId === undefined;
          }
        } else {
          if (train.countryId !== countryCode) {
            return false;
          }

          if (cityId) {
            return train.cityId === cityId;
          } else {
            return true;
          }
        }
      });

      setTrains(filtered);
      setLoading(false);
    }, delay);
  };

  return {
    trains,
    loading,
    refresh,
  };
};

