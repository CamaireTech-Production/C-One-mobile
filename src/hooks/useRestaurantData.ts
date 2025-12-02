import { useEffect, useState } from 'react';

import { homeData, type RestaurantCategory, type RestaurantItem } from '../data/data';

interface UseRestaurantDataOptions {
  delay?: number;
}

export const useRestaurantData = (
  countryId: string,
  cityId?: string,
  options: UseRestaurantDataOptions = {}
) => {
  const { delay = 500 } = options;
  const [categories, setCategories] = useState<RestaurantCategory[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timeout = setTimeout(() => {
      if (isMounted) {
        // Categories are global, no filtering needed
        setCategories(homeData.restaurants.categories);

        // Filter restaurants by countryId and optionally by cityId
        const filteredRestaurants = homeData.restaurants.restaurants.filter((restaurant) => {
          // Must match country
          if (restaurant.countryId !== countryId) {
            return false;
          }

          // If cityId is provided, filter by city
          // If cityId is not provided, show restaurants available for the entire country
          if (cityId) {
            return restaurant.cityId === cityId;
          } else {
            // Show restaurants that are available for the entire country (no specific city)
            return !restaurant.cityId;
          }
        });

        setRestaurants(filteredRestaurants);
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
    setRestaurants([]);
    setTimeout(() => {
      setCategories(homeData.restaurants.categories);
      const filteredRestaurants = homeData.restaurants.restaurants.filter((restaurant) => {
        if (restaurant.countryId !== countryId) {
          return false;
        }
        if (cityId) {
          return restaurant.cityId === cityId;
        } else {
          return !restaurant.cityId;
        }
      });
      setRestaurants(filteredRestaurants);
      setLoading(false);
    }, delay);
  };

  return {
    categories,
    restaurants,
    loading,
    refresh,
  };
};

