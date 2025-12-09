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
        // Filter transports by countryId only
        // Transport tab always shows all transports for the country, regardless of city
        const filtered = homeData.transports.filter((transport) => {
          // Must match country - always show all transports for the country
          return transport.countryId === countryId;
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
      // Transport tab always shows all transports for the country, regardless of city
      const filtered = homeData.transports.filter((transport) => {
        return transport.countryId === countryId;
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

