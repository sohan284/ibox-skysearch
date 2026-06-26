import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Flight, Filters, SortOption, BookingDetails } from "@/lib/types";
import { APP_CONSTANTS } from "@/lib/constants";

interface FlightSearchState {
  // Search params
  origin: string;
  destination: string;
  date: string; // YYYY-MM-DD
  passengers: number;

  // UI state
  filters: Filters;
  sort: SortOption;
  selectedFlight: Flight | null;
  bookingDetails: BookingDetails | null;

  // Actions
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setDate: (date: string) => void;
  setPassengers: (passengers: number) => void;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  setSort: (sort: SortOption) => void;
  setSelectedFlight: (flight: Flight | null) => void;
  setBookingDetails: (details: BookingDetails | null) => void;
  resetSearch: () => void;
  resetAll: () => void;
}

// Default values
const getTodayString = (): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split("T")[0];
};

const isDateInPast = (dateStr: string): boolean => {
  const todayStr = getTodayString();
  return dateStr < todayStr;
};

const getDefaultState = (): Omit<
  FlightSearchState,
  | "setOrigin"
  | "setDestination"
  | "setDate"
  | "setPassengers"
  | "setFilters"
  | "setSort"
  | "setSelectedFlight"
  | "setBookingDetails"
  | "resetSearch"
  | "resetAll"
> => ({
  origin: "",
  destination: "",
  date: getTodayString(),
  passengers: 1,
  filters: {
    airlines: [],
    stops: [],
    minPrice: 0,
    maxPrice: APP_CONSTANTS.MAX_PRICE_DEFAULT,
    classTypes: [],
    refundableOnly: false,
  },
  sort: "price-asc",
  selectedFlight: null,
  bookingDetails: null,
});

export const useFlightSearchStore = create<FlightSearchState>()(
  persist(
    (set) => ({
      ...getDefaultState(),
      setOrigin: (origin) => set({ origin }),
      setDestination: (destination) => set({ destination }),
      setDate: (date) => set({ date }),
      setPassengers: (passengers) => set({ passengers }),
      setFilters: (filters) =>
        set((state) => ({
          filters:
            typeof filters === "function" ? filters(state.filters) : filters,
        })),
      setSort: (sort) => set({ sort }),
      setSelectedFlight: (flight) => set({ selectedFlight: flight }),
      setBookingDetails: (details) => set({ bookingDetails: details }),
      resetSearch: () =>
        set({
          origin: "",
          destination: "",
          date: getTodayString(),
          passengers: 1,
        }),
      resetAll: () => set(getDefaultState()),
    }),
    {
      name: "flight-search-storage",
      storage: createJSONStorage(() => sessionStorage),
      // Validate persisted date on rehydration — reset to today if stale
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<FlightSearchState>;
        const date =
          persisted.date && !isDateInPast(persisted.date)
            ? persisted.date
            : getTodayString();
        return { ...currentState, ...persisted, date };
      },
    },
  ),
);
