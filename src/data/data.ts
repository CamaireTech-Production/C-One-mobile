export type HomeCountry = {
  id: string;
  labelKey: string;
  imageUrl: string;
};

export type HomeCity = {
  id: string;
  labelKey: string;
  imageUrl: string;
  countryCode?: string; // ISO 3166-1 alpha-2 country code (e.g., 'CM' for Cameroon, 'FR' for France)
};

export type PopularPlace = {
  id: string;
  titleKey: string;
  cityKey: string;
  imageUrl: string;
  rating: number;
};

export type RecentBookingStatus = 'confirmed' | 'pending' | 'cancelled';

export type RecentBooking = {
  id: string;
  titleKey: string;
  subtitleKey: string;
  status: RecentBookingStatus;
  code: string;
};

export type HomeFilter = {
  id: string;
  labelKey: string;
};

export interface HomeData {
  hero: {
    userName: string;
    greetingKey: string;
  };
  countries: HomeCountry[];
  cities: HomeCity[];
  popularPlaces: PopularPlace[];
  recentBookings: RecentBooking[];
  filters: HomeFilter[];
}

export const homeData: HomeData = {
  hero: {
    userName: '@Dany mckeny',
    greetingKey: 'home.header.greeting',
  },
  countries: [
    {
      id: 'usa',
      labelKey: 'home.countries.unitedStates',
      imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 'canada',
      labelKey: 'home.countries.canada',
      imageUrl: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 'france',
      labelKey: 'home.countries.france',
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop&q=80',
    },
  ],
  cities: [
    {
      id: 'yaounde',
      labelKey: 'home.cities.yaounde',
      imageUrl: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?fit=crop&w=600&q=60',
      countryCode: 'CM', // Cameroon
    },
    {
      id: 'douala',
      labelKey: 'home.cities.douala',
      imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?fit=crop&w=600&q=60',
      countryCode: 'CM', // Cameroon
    },
    {
      id: 'dschang',
      labelKey: 'home.cities.dschang',
      imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?fit=crop&w=600&q=60',
      countryCode: 'CM', // Cameroon
    },
  ],
  popularPlaces: [
    {
      id: 'times-square',
      titleKey: 'home.places.timesSquare',
      cityKey: 'home.places.city.newYork',
      imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?fit=crop&w=800&q=60',
      rating: 4.9,
    },
    {
      id: 'santiago',
      titleKey: 'home.places.santiago',
      cityKey: 'home.places.city.chile',
      imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?fit=crop&w=800&q=60',
      rating: 4.7,
    },
    {
      id: 'hilton-yaounde',
      titleKey: 'home.places.hiltonYaounde',
      cityKey: 'home.places.city.yaounde',
      imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?fit=crop&w=800&q=60',
      rating: 4.8,
    },
  ],
  recentBookings: [
    {
      id: 'cn-79462563',
      titleKey: 'home.bookings.parisDakar',
      subtitleKey: 'home.bookings.flight',
      status: 'confirmed',
      code: 'CN-79462563',
    },
    {
      id: 'cn-39804253',
      titleKey: 'home.bookings.tgvParis',
      subtitleKey: 'home.bookings.train',
      status: 'pending',
      code: 'CN-39804253',
    },
    {
      id: 'cn-39804254',
      titleKey: 'home.bookings.yaoundeMaroua',
      subtitleKey: 'home.bookings.flight',
      status: 'confirmed',
      code: 'CN-39804254',
    },
  ],
  filters: [
    { id: 'transport', labelKey: 'home.filters.transport' },
    { id: 'hotels', labelKey: 'home.filters.hotels' },
    { id: 'tourism', labelKey: 'home.filters.tourism' },
    { id: 'restaurant', labelKey: 'home.filters.restaurant' },
  ],
};

