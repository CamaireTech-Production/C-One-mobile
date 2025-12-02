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

// Transport Types
export type TransportType = 'plane' | 'train' | 'car';

export type TransportItem = {
  id: string;
  countryId: string; // ISO country code (e.g., 'CM', 'FR', 'CA')
  cityId?: string; // City ID (optional - if null, available for entire country)
  type: TransportType;
  title: string;
  description: string;
  imageUrl?: string;
};

// Hotel Types
export type HotelItem = {
  id: string;
  countryId: string; // ISO country code
  cityId?: string; // City ID (optional)
  title: string;
  imageUrl: string;
  rating: number; // 1-5
  pricePerNight: number;
  currency: string; // "USD", "EUR", "CAD", etc.
  distance: number; // in km
  distanceUnit: string; // "km"
  duration: number; // in minutes
  address: string;
  category?: 'popular' | 'other';
};

// Tourism Types
export type TourismCategory = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export type TourismPlace = {
  id: string;
  countryId: string; // ISO country code
  cityId?: string; // City ID (optional)
  title: string;
  imageUrl: string;
  categoryId: string; // Reference to TourismCategory
  startingPrice?: number; // "À partir $250"
  currency?: string;
  distance: number; // in km
  distanceUnit: string; // "km"
  duration: number; // in minutes
  address: string;
  category?: 'popular' | 'other';
};

// Restaurant Types
export type RestaurantCategory = {
  id: string;
  title: string;
  imageUrl: string;
};

export type RestaurantItem = {
  id: string;
  countryId: string; // ISO country code
  cityId?: string; // City ID (optional)
  title: string;
  subtitle?: string; // "(Québec)"
  imageUrl: string;
  categoryId: string; // Reference to RestaurantCategory
  rating: number; // 1-5
  pricePerTable: number; // "$250 / table"
  currency: string;
  distance: number; // in km
  distanceUnit: string; // "km"
  duration: number; // in minutes
  address: string;
  category?: 'popular' | 'other';
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
  transports: TransportItem[];
  hotels: HotelItem[];
  tourism: {
    categories: TourismCategory[];
    places: TourismPlace[];
  };
  restaurants: {
    categories: RestaurantCategory[];
    restaurants: RestaurantItem[];
  };
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
  transports: [
    // Cameroon (CM)
    {
      id: 'transport-cm-1',
      countryId: 'CM',
      cityId: 'yaounde',
      type: 'plane',
      title: 'Avion',
      description: 'Réserver votre billet de vol en toute sécurité',
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop',
    },
    {
      id: 'transport-cm-2',
      countryId: 'CM',
      cityId: 'yaounde',
      type: 'train',
      title: 'Train',
      description: 'Réserver votre ticket de train en toute sécurité',
      imageUrl: 'https://images.unsplash.com/photo-1551590192-8070a16d9f67?w=400&h=300&fit=crop',
    },
    {
      id: 'transport-cm-3',
      countryId: 'CM',
      type: 'car',
      title: 'Voiture',
      description: 'Louez votre voiture en toute sécurité peu importe votre destination',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
    },
    // Canada (CA)
    {
      id: 'transport-ca-1',
      countryId: 'CA',
      type: 'plane',
      title: 'Avion',
      description: 'Réserver votre billet de vol en toute sécurité',
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop',
    },
    {
      id: 'transport-ca-2',
      countryId: 'CA',
      type: 'train',
      title: 'Train',
      description: 'Réserver votre ticket de train en toute sécurité',
      imageUrl: 'https://images.unsplash.com/photo-1551590192-8070a16d9f67?w=400&h=300&fit=crop',
    },
    {
      id: 'transport-ca-3',
      countryId: 'CA',
      type: 'car',
      title: 'Voiture',
      description: 'Louez votre voiture en toute sécurité peu importe votre destination',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
    },
  ],
  hotels: [
    // Cameroon - Yaounde
    {
      id: 'hotel-cm-yaounde-1',
      countryId: 'CM',
      cityId: 'yaounde',
      title: 'Skyline Hôtel',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      rating: 4,
      pricePerNight: 250,
      currency: 'USD',
      distance: 1.5,
      distanceUnit: 'km',
      duration: 30,
      address: 'Rue 1937, Yaounde',
      category: 'popular',
    },
    {
      id: 'hotel-cm-yaounde-2',
      countryId: 'CM',
      cityId: 'yaounde',
      title: 'Hôtel Mont Fébé',
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      rating: 4.5,
      pricePerNight: 180,
      currency: 'USD',
      distance: 2.3,
      distanceUnit: 'km',
      duration: 35,
      address: 'Avenue Kennedy, Yaounde',
      category: 'popular',
    },
    {
      id: 'hotel-cm-yaounde-3',
      countryId: 'CM',
      cityId: 'yaounde',
      title: 'Hôtel Hilton Yaounde',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      rating: 5,
      pricePerNight: 320,
      currency: 'USD',
      distance: 3.1,
      distanceUnit: 'km',
      duration: 45,
      address: 'Boulevard du 20 Mai, Yaounde',
      category: 'other',
    },
    // Cameroon - Douala
    {
      id: 'hotel-cm-douala-1',
      countryId: 'CM',
      cityId: 'douala',
      title: 'Hôtel Sawa',
      imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
      rating: 4,
      pricePerNight: 200,
      currency: 'USD',
      distance: 1.2,
      distanceUnit: 'km',
      duration: 25,
      address: 'Boulevard de la Liberté, Douala',
      category: 'popular',
    },
    // Canada - Toronto
    {
      id: 'hotel-ca-toronto-1',
      countryId: 'CA',
      title: 'Skyline Hôtel',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      rating: 4,
      pricePerNight: 250,
      currency: 'CAD',
      distance: 1.5,
      distanceUnit: 'km',
      duration: 30,
      address: 'Rue 1937, Toronto',
      category: 'popular',
    },
    {
      id: 'hotel-ca-toronto-2',
      countryId: 'CA',
      title: 'Hôtel Royal',
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      rating: 4.5,
      pricePerNight: 300,
      currency: 'CAD',
      distance: 2.0,
      distanceUnit: 'km',
      duration: 35,
      address: 'Avenue Yonge, Toronto',
      category: 'popular',
    },
    {
      id: 'hotel-ca-vancouver-1',
      countryId: 'CA',
      title: 'Hôtel Pacific',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      rating: 4.8,
      pricePerNight: 280,
      currency: 'CAD',
      distance: 1.8,
      distanceUnit: 'km',
      duration: 28,
      address: 'Rue Granville, Vancouver',
      category: 'other',
    },
  ],
  tourism: {
    categories: [
      {
        id: 'tourism-cat-1',
        title: 'Patrimoine & Culture',
        description: 'Monuments, musées, architecture, sites historiques',
        imageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop',
      },
      {
        id: 'tourism-cat-2',
        title: 'Nature & Plein air',
        description: 'Randonnée, parcs, jardins, paysages',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      },
    ],
    places: [
      // Cameroon - Yaounde
      {
        id: 'tourism-cm-yaounde-1',
        countryId: 'CM',
        cityId: 'yaounde',
        title: 'Musée National du Cameroun',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
        categoryId: 'tourism-cat-1',
        startingPrice: 10,
        currency: 'USD',
        distance: 2.5,
        distanceUnit: 'km',
        duration: 40,
        address: 'Avenue du Musée, Yaounde',
        category: 'popular',
      },
      {
        id: 'tourism-cm-yaounde-2',
        countryId: 'CM',
        cityId: 'yaounde',
        title: 'Mont Fébé',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        categoryId: 'tourism-cat-2',
        distance: 5.0,
        distanceUnit: 'km',
        duration: 60,
        address: 'Mont Fébé, Yaounde',
        category: 'popular',
      },
      // Canada - Toronto
      {
        id: 'tourism-ca-toronto-1',
        countryId: 'CA',
        title: 'Musée Royal de l\'Ontario',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
        categoryId: 'tourism-cat-1',
        startingPrice: 250,
        currency: 'CAD',
        distance: 1.5,
        distanceUnit: 'km',
        duration: 30,
        address: 'Rue 1257, Toronto',
        category: 'popular',
      },
      {
        id: 'tourism-ca-niagara-1',
        countryId: 'CA',
        title: 'Chutes du Niagara',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        categoryId: 'tourism-cat-2',
        distance: 130,
        distanceUnit: 'km',
        duration: 90,
        address: 'Niagara Falls, Ontario',
        category: 'popular',
      },
    ],
  },
  restaurants: {
    categories: [
      {
        id: 'restaurant-cat-1',
        title: 'Plats Nationaux',
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561b1e?w=800&h=600&fit=crop',
      },
      {
        id: 'restaurant-cat-2',
        title: 'Haute Gastronomie',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      },
    ],
    restaurants: [
      // Cameroon - Yaounde
      {
        id: 'restaurant-cm-yaounde-1',
        countryId: 'CM',
        cityId: 'yaounde',
        title: 'Le Bénédictine',
        subtitle: 'Yaounde',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
        categoryId: 'restaurant-cat-1',
        rating: 4,
        pricePerTable: 50,
        currency: 'USD',
        distance: 1.2,
        distanceUnit: 'km',
        duration: 20,
        address: 'Avenue Kennedy, Yaounde',
        category: 'popular',
      },
      {
        id: 'restaurant-cm-yaounde-2',
        countryId: 'CM',
        cityId: 'yaounde',
        title: 'La Fourchette',
        subtitle: 'Yaounde',
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561b1e?w=800&h=600&fit=crop',
        categoryId: 'restaurant-cat-2',
        rating: 4.5,
        pricePerTable: 80,
        currency: 'USD',
        distance: 2.1,
        distanceUnit: 'km',
        duration: 30,
        address: 'Boulevard du 20 Mai, Yaounde',
        category: 'popular',
      },
      // Canada - Québec
      {
        id: 'restaurant-ca-quebec-1',
        countryId: 'CA',
        title: 'La Bûche',
        subtitle: 'Québec',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
        categoryId: 'restaurant-cat-1',
        rating: 4,
        pricePerTable: 250,
        currency: 'CAD',
        distance: 1.5,
        distanceUnit: 'km',
        duration: 30,
        address: 'Rue 123, Québec',
        category: 'popular',
      },
      {
        id: 'restaurant-ca-toronto-1',
        countryId: 'CA',
        title: 'Coras: nature',
        subtitle: 'Toronto',
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561b1e?w=800&h=600&fit=crop',
        categoryId: 'restaurant-cat-2',
        rating: 4.2,
        pricePerTable: 180,
        currency: 'CAD',
        distance: 1.5,
        distanceUnit: 'km',
        duration: 25,
        address: 'Avenue Yonge, Toronto',
        category: 'popular',
      },
    ],
  },
};

