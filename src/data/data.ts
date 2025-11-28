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
    // Cameroon (CM)
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
    // Netherlands (NL)
    {
      id: 'amsterdam',
      labelKey: 'home.cities.amsterdam',
      imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?fit=crop&w=600&q=60',
      countryCode: 'NL', // Netherlands
    },
    {
      id: 'rotterdam',
      labelKey: 'home.cities.rotterdam',
      imageUrl: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?fit=crop&w=600&q=60',
      countryCode: 'NL', // Netherlands
    },
    {
      id: 'la-haye',
      labelKey: 'home.cities.laHaye',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?fit=crop&w=600&q=60',
      countryCode: 'NL', // Netherlands
    },
    // Romania (RO)
    {
      id: 'bucarest',
      labelKey: 'home.cities.bucarest',
      imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?fit=crop&w=600&q=60',
      countryCode: 'RO', // Romania
    },
    {
      id: 'cluj-napoca',
      labelKey: 'home.cities.clujNapoca',
      imageUrl: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?fit=crop&w=600&q=60',
      countryCode: 'RO', // Romania
    },
    {
      id: 'timisoara',
      labelKey: 'home.cities.timisoara',
      imageUrl: 'https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?fit=crop&w=600&q=60',
      countryCode: 'RO', // Romania
    },
    // Mexico (MX)
    {
      id: 'mexico',
      labelKey: 'home.cities.mexico',
      imageUrl: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?fit=crop&w=600&q=60',
      countryCode: 'MX', // Mexico
    },
    {
      id: 'guadalajara',
      labelKey: 'home.cities.guadalajara',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fit=crop&w=600&q=60',
      countryCode: 'MX', // Mexico
    },
    {
      id: 'cancun',
      labelKey: 'home.cities.cancun',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?fit=crop&w=600&q=60',
      countryCode: 'MX', // Mexico
    },
    // Japan (JP)
    {
      id: 'tokyo',
      labelKey: 'home.cities.tokyo',
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?fit=crop&w=600&q=60',
      countryCode: 'JP', // Japan
    },
    {
      id: 'osaka',
      labelKey: 'home.cities.osaka',
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?fit=crop&w=600&q=60',
      countryCode: 'JP', // Japan
    },
    {
      id: 'kyoto',
      labelKey: 'home.cities.kyoto',
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?fit=crop&w=600&q=60',
      countryCode: 'JP', // Japan
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

