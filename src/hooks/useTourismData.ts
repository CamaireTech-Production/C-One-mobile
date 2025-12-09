import { useEffect, useState } from 'react';

import { homeData, type TourismCategory, type TourismPlace } from '../data/data';

interface UseTourismDataOptions {
  delay?: number;
}

export const useTourismData = (
  countryId: string,
  cityId?: string,
  options: UseTourismDataOptions = {}
) => {
  const { delay = 500 } = options;
  const [categories, setCategories] = useState<TourismCategory[]>([]);
  const [places, setPlaces] = useState<TourismPlace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timeout = setTimeout(() => {
      if (isMounted) {
        // Categories are global, no filtering needed
        setCategories(homeData.tourism.categories);

        // Filter places by countryId and optionally by cityId
        const filteredPlaces = homeData.tourism.places.filter((place) => {
          // Must match country
          if (place.countryId !== countryId) {
            return false;
          }

          // If cityId is provided, filter by city
          // If cityId is not provided, show places available for the entire country
          if (cityId) {
            return place.cityId === cityId;
          } else {
            // Show places that are available for the entire country (no specific city)
            return !place.cityId;
          }
        });

        setPlaces(filteredPlaces);
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
    setPlaces([]);
    setTimeout(() => {
      setCategories(homeData.tourism.categories);
      const filteredPlaces = homeData.tourism.places.filter((place) => {
        if (place.countryId !== countryId) {
          return false;
        }
        if (cityId) {
          return place.cityId === cityId;
        } else {
          return !place.cityId;
        }
      });
      setPlaces(filteredPlaces);
      setLoading(false);
    }, delay);
  };

  return {
    categories,
    places,
    loading,
    refresh,
  };
};

