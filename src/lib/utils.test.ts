import { describe, it, expect } from "vitest";
import {
  formatDuration,
  getAirlineInitials,
  getAirlineAvatarStyles,
  getUniqueAirlines,
  filterFlights,
  sortFlights,
} from "./utils";
import type { Flight, Filters } from "./types";

// Mock Flights for testing
const mockFlights: Flight[] = [
  {
    id: "1",
    airline: "Biman Bangladesh Airlines",
    flightNumber: "BG 101",
    origin: "DAC",
    destination: "CGP",
    departureTime: "08:00",
    arrivalTime: "08:45",
    durationMinutes: 45,
    stops: 0,
    price: 3500,
    currency: "BDT",
    date: "2026-07-01",
    classType: "Economy",
    refundable: true,
    cabinBaggage: "7kg",
    checkedBaggage: "20kg",
  },
  {
    id: "2",
    airline: "US-Bangla Airlines",
    flightNumber: "BS 201",
    origin: "DAC",
    destination: "CGP",
    departureTime: "12:00",
    arrivalTime: "13:00",
    durationMinutes: 60,
    stops: 0,
    price: 4500,
    currency: "BDT",
    date: "2026-07-01",
    classType: "Business",
    refundable: false,
    cabinBaggage: "7kg",
    checkedBaggage: "30kg",
  },
  {
    id: "3",
    airline: "Novoair",
    flightNumber: "VQ 301",
    origin: "DAC",
    destination: "CGP",
    departureTime: "15:00",
    arrivalTime: "16:15",
    durationMinutes: 75,
    stops: 1,
    price: 4000,
    currency: "BDT",
    date: "2026-07-01",
    classType: "Economy",
    refundable: true,
    cabinBaggage: "7kg",
    checkedBaggage: "20kg",
  },
];

describe("Flight Utils", () => {
  describe("formatDuration", () => {
    it("should format minutes correctly into hours and minutes", () => {
      expect(formatDuration(45)).toBe("0h 45m");
      expect(formatDuration(60)).toBe("1h 0m");
      expect(formatDuration(125)).toBe("2h 5m");
    });
  });

  describe("getAirlineInitials", () => {
    it("should return the correct initials for known airlines", () => {
      expect(getAirlineInitials("Biman Bangladesh")).toBe("BB");
      expect(getAirlineInitials("Novoair")).toBe("NO");
      expect(getAirlineInitials("US-Bangla Airlines")).toBe("US");
    });

    it("should return fallback initials for unknown airlines", () => {
      expect(getAirlineInitials("Astra Airways")).toBe("AA");
      expect(getAirlineInitials("Emirates")).toBe("EM");
    });
  });

  describe("getAirlineAvatarStyles", () => {
    it("should return CSS style strings for known airlines", () => {
      expect(getAirlineAvatarStyles("Biman Bangladesh")).toContain("green");
      expect(getAirlineAvatarStyles("US-Bangla")).toContain("rose");
      expect(getAirlineAvatarStyles("Novoair")).toContain("blue");
    });
  });

  describe("getUniqueAirlines", () => {
    it("should extract unique sorted airlines from flights list", () => {
      const airlines = getUniqueAirlines(mockFlights);
      expect(airlines).toEqual([
        "Biman Bangladesh Airlines",
        "Novoair",
        "US-Bangla Airlines",
      ]);
    });
  });

  describe("filterFlights", () => {
    const defaultFilters: Filters = {
      airlines: [],
      stops: [],
      minPrice: 0,
      maxPrice: 10000,
      classTypes: [],
      refundableOnly: false,
    };

    it("should filter by airline if provided", () => {
      const result = filterFlights(mockFlights, {
        ...defaultFilters,
        airlines: ["Novoair"],
      });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("3");
    });

    it("should filter by price range", () => {
      const result = filterFlights(mockFlights, {
        ...defaultFilters,
        minPrice: 3800,
        maxPrice: 4200,
      });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("3"); // Price 4000
    });

    it("should filter for refundable flights only", () => {
      const result = filterFlights(mockFlights, {
        ...defaultFilters,
        refundableOnly: true,
      });
      expect(result).toHaveLength(2); // IDs 1 and 3 are refundable
    });
  });

  describe("sortFlights", () => {
    it("should sort flights by price ascending", () => {
      const result = sortFlights(mockFlights, "price-asc");
      expect(result[0].id).toBe("1"); // 3500
      expect(result[1].id).toBe("3"); // 4000
      expect(result[2].id).toBe("2"); // 4500
    });

    it("should sort flights by duration ascending", () => {
      const result = sortFlights(mockFlights, "duration-asc");
      expect(result[0].id).toBe("1"); // 45m
      expect(result[1].id).toBe("2"); // 60m
      expect(result[2].id).toBe("3"); // 75m
    });
  });
});
