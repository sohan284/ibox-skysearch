export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  stops: number;
  price: number;
  currency: string;
}

export interface SearchParams {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

export interface Filters {
  airlines: string[];
  stops: number[];
  minPrice: number;
  maxPrice: number;
}

export interface BookingDetails {
  flightId: string;
  passengerName: string;
  email: string;
  phone: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'duration-asc' | 'departure-asc';
