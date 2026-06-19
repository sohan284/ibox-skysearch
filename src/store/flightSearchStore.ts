import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Flight, Filters, SortOption, BookingDetails } from "@/lib/types";

interface FlightSearchState {
  // Search params
  origin: string;
  destination: string;
  date: string; // YYYY-MM-DD
  passengers: number;
  
  // UI state
  step: "results" | "booking" | "confirmation";
  filters: Filters;
  sort: SortOption;
  selectedFlight: Flight | null;
  bookingDetails: BookingDetails | null;
  
  // Actions
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setDate: (date: string) => void;
  setPassengers: (passengers: number) => void;
  setStep: (step: "results" | "booking" | "confirmation") => void;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  setSort: (sort: SortOption) => void;
  setSelectedFlight: (flight: Flight | null) => void;
  setBookingDetails: (details: BookingDetails | null) => void;
  resetSearch: () => void;
  resetAll: () => void;
}

// Default values
const getDefaultState = (): Omit<
  FlightSearchState,
  | "setOrigin"
  | "setDestination"
  | "setDate"
  | "setPassengers"
  | "setStep"
  | "setFilters"
  | "setSort"
  | "setSelectedFlight"
  | "setBookingDetails"
  | "resetSearch"
  | "resetAll"
> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return {
    origin: "",
    destination: "",
    date: today.toISOString().split("T")[0],
    passengers: 1,
    step: "results",
    filters: {
      airlines: [],
      stops: [],
      minPrice: 0,
      maxPrice: 1000000, // High enough default to not filter anything
    },
    sort: "price-asc",
    selectedFlight: null,
    bookingDetails: null,
  };
};

export const useFlightSearchStore = create<FlightSearchState>()(
  persist(
    (set) => ({
      ...getDefaultState(),
      setOrigin: (origin) => set({ origin }),
      setDestination: (destination) => set({ destination }),
      setDate: (date) => set({ date }),
      setPassengers: (passengers) => set({ passengers }),
      setStep: (step) => set({ step }),
      setFilters: (filters) => set((state) => ({
        filters: typeof filters === 'function' ? filters(state.filters) : filters,
      })),
      setSort: (sort) => set({ sort }),
      setSelectedFlight: (flight) => set({ selectedFlight: flight }),
      setBookingDetails: (details) => set({ bookingDetails: details }),
      resetSearch: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        set({
          origin: "",
          destination: "",
          date: today.toISOString().split("T")[0],
          passengers: 1,
        });
      },
      resetAll: () => set(getDefaultState()),
    }),
    {
      name: "flight-search-storage", // Name of the sessionStorage key
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
