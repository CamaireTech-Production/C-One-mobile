import { useEffect, useState } from 'react';

import { homeData, type HomeData } from '../data/homeData';

interface UseHomeDataOptions {
  delay?: number;
}

export const useHomeData = (options: UseHomeDataOptions = {}) => {
  const { delay = 800 } = options;
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const timeout = setTimeout(() => {
      if (isMounted) {
        setData(homeData);
        setLoading(false);
      }
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [delay]);

  const refresh = () => {
    setLoading(true);
    setData(null);
    setTimeout(() => {
      setData(homeData);
      setLoading(false);
    }, delay);
  };

  return {
    data,
    loading,
    refresh,
  };
};


