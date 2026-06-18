import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FlightSearchState {
  origin: string;
  destination: string;
  date: string; // YYYY-MM-DD
  passengers: number;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setDate: (date: string) => void;
  setPassengers: (passengers: number) => void;
  resetSearch: () => void;
}

// Default values
const getDefaultState = (): Pick<
  FlightSearchState,
  "origin" | "destination" | "date" | "passengers"
> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return {
    origin: "",
    destination: "",
    date: today.toISOString().split("T")[0],
    passengers: 1,
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
      resetSearch: () => set(getDefaultState()),
    }),
    {
      name: "flight-search-storage", // Name of the sessionStorage key
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
