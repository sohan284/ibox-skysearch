import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Flight, Filters, SortOption } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function getUniqueAirlines(flights: Flight[]): string[] {
  return Array.from(new Set(flights.map((f) => f.airline))).sort();
}

export function filterFlights(flights: Flight[], filters: Filters): Flight[] {
  return flights.filter((flight) => {
    if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) {
      return false;
    }
    if (filters.stops.length > 0 && !filters.stops.includes(flight.stops)) {
      return false;
    }
    if (flight.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice > 0 && flight.price > filters.maxPrice) {
      return false;
    }
    return true;
  });
}

export function sortFlights(flights: Flight[], sort: SortOption): Flight[] {
  const sorted = [...flights];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "duration-asc":
      return sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
    case "departure-asc":
      return sorted.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    default:
      return sorted;
  }
}
