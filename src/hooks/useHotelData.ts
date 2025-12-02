import { useEffect, useState } from 'react';

import { homeData, type HotelItem } from '../data/data';

interface UseHotelDataOptions {
  delay?: number;
}

export const useHotelData = (
  countryId: string,
  cityId?: string,
  options: UseHotelDataOptions = {}
) => {
  const { delay = 500 } = options;
  const [data, setData] = useState<HotelItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timeout = setTimeout(() => {
      if (isMounted) {
        // Filter hotels by countryId and optionally by cityId
        const filtered = homeData.hotels.filter((hotel) => {
          // Must match country
          if (hotel.countryId !== countryId) {
            return false;
          }

          // If cityId is provided, filter by city
          // If cityId is not provided, show hotels available for the entire country (cityId is undefined/null)
          if (cityId) {
            return hotel.cityId === cityId;
          } else {
            // Show hotels that are available for the entire country (no specific city)
            return !hotel.cityId;
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
      const filtered = homeData.hotels.filter((hotel) => {
        if (hotel.countryId !== countryId) {
          return false;
        }
        if (cityId) {
          return hotel.cityId === cityId;
        } else {
          return !hotel.cityId;
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

