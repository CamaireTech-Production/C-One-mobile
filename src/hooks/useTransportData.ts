import { useEffect, useState } from 'react';

import { homeData, type TransportItem } from '../data/data';

interface UseTransportDataOptions {
  delay?: number;
}

export const useTransportData = (
  countryId: string,
  cityId?: string,
  options: UseTransportDataOptions = {}
) => {
  const { delay = 500 } = options;
  const [data, setData] = useState<TransportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timeout = setTimeout(() => {
      if (isMounted) {
        // Filter transports by countryId and optionally by cityId
        const filtered = homeData.transports.filter((transport) => {
          // Must match country
          if (transport.countryId !== countryId) {
            return false;
          }

          // If cityId is provided, filter by city
          // If cityId is not provided, show transports available for the entire country
          if (cityId) {
            return transport.cityId === cityId;
          } else {
            // Show transports that are available for the entire country (no specific city)
            return !transport.cityId;
          }
        });

        setData(filtered);
        setLoading(false);
      }
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [countryId, cityId, delay]);

  const refresh = () => {
    setLoading(true);
    setData([]);
    setTimeout(() => {
      const filtered = homeData.transports.filter((transport) => {
        if (transport.countryId !== countryId) {
          return false;
        }
        if (cityId) {
          return transport.cityId === cityId;
        } else {
          return !transport.cityId;
        }
      });
      setData(filtered);
      setLoading(false);
    }, delay);
  };

  return {
    data,
    loading,
    refresh,
  };
};

