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
  date: string; // YYYY-MM-DD
  classType: "Economy" | "Business";
  refundable: boolean;
  cabinBaggage: string;
  checkedBaggage: string;
}

export interface Filters {
  airlines: string[];
  stops: number[];
  minPrice: number;
  maxPrice: number;
  classTypes: ("Economy" | "Business")[];
  refundableOnly: boolean;
}

export interface Passenger {
  fullName: string;
  email: string;
  phone: string;
}

export interface BookingDetails {
  flightId: string;
  passengers: Passenger[];
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "duration-asc"
  | "departure-asc";
