import { useEffect, useState } from 'react';

import { homeData } from '../../data/data';
import type { RideHailingService } from '../../types/transport';

interface UseCarDataOptions {
  delay?: number;
}

/**
 * Hook to fetch and filter ride-hailing services (Uber, Lyft, Yango, Bolt)
 * 
 * Filters services by countryId and optionally by cityId
 * Services can be available for entire country (cityId = null) or specific cities
 */
export const useCarData = (
  countryCode: string,
  cityId?: string,
  options: UseCarDataOptions = {}
) => {
  const { delay = 500 } = options;
  const [services, setServices] = useState<RideHailingService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timeout = setTimeout(() => {
      if (isMounted) {
        // Filter ride-hailing services by countryId and optionally by cityId
        const filtered = homeData.rideHailingServices.filter((service) => {
          // Must match country
          if (service.countryId !== countryCode) {
            return false;
          }

          // If cityId is provided, filter by city
          // If cityId is not provided, show services available for the entire country
          if (cityId) {
            return service.cityId === cityId;
          } else {
            // Show services that are available for the entire country (no specific city)
            // OR services available for the city if cityId matches
            return !service.cityId || service.cityId === cityId;
          }
        });

        setServices(filtered);
        setLoading(false);
      }
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [countryCode, cityId, delay]);

  const refresh = () => {
    setLoading(true);
    setServices([]);
    setTimeout(() => {
      const filtered = homeData.rideHailingServices.filter((service) => {
        if (service.countryId !== countryCode) {
          return false;
        }

        if (cityId) {
          return service.cityId === cityId;
        } else {
          return !service.cityId || service.cityId === cityId;
        }
      });

      setServices(filtered);
      setLoading(false);
    }, delay);
  };

  return {
    services,
    loading,
    refresh,
  };
};

