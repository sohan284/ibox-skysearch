export const APP_CONSTANTS = {
  MAX_PRICE_DEFAULT: 1000000,
  STORAGE_KEYS: {
    FLIGHT_SEARCH: "flight-search-storage",
  },
} as const;

export const SORT_OPTIONS = [
  { value: "price-asc" as const, label: "Price: Low to High" },
  { value: "price-desc" as const, label: "Price: High to Low" },
  { value: "duration-asc" as const, label: "Duration: Shortest" },
  { value: "departure-asc" as const, label: "Departure: Earliest" },
];

export const STOP_OPTIONS = [
  { value: 0, label: "Non-stop" },
  { value: 1, label: "1 stop" },
  { value: 2, label: "2+ stops" },
];
