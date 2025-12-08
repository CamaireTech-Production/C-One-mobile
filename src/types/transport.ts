/**
 * Transport Types
 * Types for transport offers, bookings, tickets, and ride-hailing services
 */

// Transport Offer Types (Flights & Trains)
export type TransportOfferType = 'plane' | 'train';

export type TransportStop = {
  city: string;
  cityCode?: string; // Airport/Station code
  time: string; // "12:00"
  duration?: string; // "2h 30m" - time spent at stop
};

export type TransportOffer = {
  id: string;
  type: TransportOfferType;
  // Route information
  origin: string; // City name (e.g., "Yaoundé", "Quebec")
  originCode?: string; // Airport/Station code (e.g., 'QBC', 'NYK', 'YDE')
  destination: string; // City name
  destinationCode?: string; // Airport/Station code
  // Timing
  departureTime: string; // "12:20"
  arrivalTime: string; // "14:17"
  duration: string; // "6h 28m", "2h 30min"
  // Flight/Train details
  isNonStop: boolean;
  stops?: TransportStop[]; // For transfers/layovers
  numberOfStops?: number; // e.g., 3 escales
  // Provider information
  airline?: string; // "IndiGo", "Camair-co", "Air India"
  airlineLogo?: string; // URL to logo
  trainCompany?: string; // For trains
  trainCompanyLogo?: string; // URL to logo
  // Pricing
  price: number;
  currency: string; // "$", "€", "xaf", "C$", "£", "¥", "A$"
  passengersIncluded: number; // Base price for X passengers (e.g., 2)
  // Location context
  countryId: string; // ISO country code (e.g., 'CM', 'FR', 'US', 'CA')
  cityId?: string; // Optional - if null, available for entire country
  // Availability
  availableDates?: string[]; // Dates available for this route (format: "DD-MM-YYYY")
};

// Ride-Hailing Service Types
export type RideHailingProvider = 'uber' | 'lyft' | 'yango' | 'bolt';

export type RideHailingService = {
  id: string;
  provider: RideHailingProvider;
  name: string; // "Uber Comfort", "Lyft Standard", "Yango Premium"
  coverage: string; // "Toutes grandes ville", "Forte présence", "Couverture nationale"
  countryId: string; // ISO country code
  cityId?: string; // Optional - if null, available for entire country
  logoUrl?: string; // URL to provider logo
  downloadUrl?: string; // URL to download the app
  color?: string; // Brand color for the card (e.g., Uber black, Lyft pink)
};

// Booking Details Types
export type PassengerCount = {
  adults: number;
  children: number;
  babies: number;
};

export type BaggageItem = {
  id: string;
  weight: number; // in kg
};

export type TransportClass = 'standard' | 'vip';

export type BookingDetails = {
  offerId: string;
  type: TransportOfferType;
  // Transport details
  origin: string;
  originCode?: string;
  destination: string;
  destinationCode?: string;
  date: string; // "10-11-2025"
  departureTime: string;
  arrivalTime: string;
  duration: string;
  airline?: string;
  trainCompany?: string;
  // User selections
  passengers: PassengerCount;
  baggage: BaggageItem[];
  class: TransportClass;
  // Pricing breakdown
  basePrice: number;
  baggagePrice: number;
  classPrice: number;
  totalPrice: number;
  currency: string;
};

// Ticket Types
export type DocumentType = 'passport' | 'cni'; // CNI = Carte Nationale d'Identité

export type TransportTicket = {
  id: string;
  bookingId: string;
  type: TransportOfferType;
  // Passenger information
  passengerName: string;
  documentType: DocumentType;
  documentId: string;
  // Flight/Train details
  origin: string;
  originCode?: string;
  destination: string;
  destinationCode?: string;
  departureDate: string; // "10-11-2025"
  arrivalDate: string; // "10-11-2025"
  departureTime: string; // "12:20"
  arrivalTime: string; // "14:17"
  duration: string; // "6h 28m"
  // Airport/Train station details
  terminal?: string; // For flights (e.g., "Terminal 1", "T1")
  gate?: string; // For flights (e.g., "Gate A12", "A12")
  platform?: string; // For trains (e.g., "Platform 3", "Voie 3")
  // Booking details
  seat?: string; // For flights (e.g., "2", "12A")
  numberOfSeats: number; // For trains
  baggage: number; // Number of baggage items
  totalWeight: string; // "40kg"
  class: TransportClass;
  // Payment information
  paymentMethod: string; // "VISA **** 1234", "Mastercard **** 1234"
  totalAmount: number;
  currency: string;
  paymentDate: string; // "13 JUIL. 2024", "13-11-17"
  // Display information
  barcode: string; // Barcode number (e.g., "1234567890123")
  airline?: string;
  airlineLogo?: string;
  trainCompany?: string;
  trainCompanyLogo?: string;
};

// Search Context Types
export type SearchContext = 'client-location' | 'other-country';

// Search Criteria Types
export type TransportSearchCriteria = {
  origin: string;
  destination: string;
  date: string; // "10-11-2025"
  returnDate?: string; // Optional for round trips
  passengers: number;
  countryCode: string; // Context country code
  cityId?: string; // Optional city context
  context: SearchContext;
};

