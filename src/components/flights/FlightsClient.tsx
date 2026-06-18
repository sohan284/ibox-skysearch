"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { MOCK_FLIGHTS } from "@/lib/mock-data";
import { filterFlights, sortFlights, getUniqueAirlines } from "@/lib/utils";
import type { Flight, Filters, SortOption, BookingDetails } from "@/lib/types";
import { ResultsView } from "@/components/flights/ResultsView";
import { BookingForm } from "@/components/flights/BookingForm";
import { ConfirmationView } from "@/components/flights/ConfirmationView";

export function FlightsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const date = searchParams.get("date") || "";
  const passengers = Number(searchParams.get("passengers") || 1);

  const [step, setStep] = useState<"results" | "booking" | "confirmation">(
    "results",
  );
  const [filters, setFilters] = useState<Filters>({
    airlines: [],
    stops: [],
    minPrice: 0,
    maxPrice: 0, // Will be updated once we calculate maxPrice
  });
  const [sort, setSort] = useState<SortOption>("price-asc");
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null,
  );

  // First, filter by search params (origin, destination, date)
  const searchFilteredFlights = useMemo(() => {
    return MOCK_FLIGHTS.filter((flight) => {
      if (origin && flight.origin !== origin) return false;
      if (destination && flight.destination !== destination) return false;
      if (date && flight.date !== date) return false;
      return true;
    });
  }, [origin, destination, date]);

  const airlines = useMemo(
    () => getUniqueAirlines(searchFilteredFlights),
    [searchFilteredFlights],
  );
  const maxPrice = useMemo(() => {
    if (searchFilteredFlights.length === 0) return 0;
    return Math.max(...searchFilteredFlights.map((f) => f.price));
  }, [searchFilteredFlights]);

  // Update filters when maxPrice changes
  useEffect(() => {
    if (maxPrice > 0) {
      setFilters((prev) => ({
        ...prev,
        maxPrice: prev.maxPrice === 0 ? maxPrice : prev.maxPrice,
      }));
    }
  }, [maxPrice]);

  // Apply additional filters (airline, stops, price range)
  const filteredFlights = useMemo(() => {
    return sortFlights(
      filterFlights(searchFilteredFlights, {
        ...filters,
        // If maxPrice wasn't set (0), use the max price from search results
        maxPrice: filters.maxPrice === 1000 ? maxPrice : filters.maxPrice,
      }),
      sort,
    );
  }, [filters, sort, searchFilteredFlights, maxPrice]);

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setStep("booking");
  };

  const handleBook = (details: BookingDetails) => {
    setBookingDetails(details);
    setStep("confirmation");
  };

  const handleNewSearch = () => {
    router.push("/");
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {step === "results" && (
        <ResultsView
          flights={filteredFlights}
          filters={filters}
          setFilters={setFilters}
          sort={sort}
          setSort={setSort}
          airlines={airlines}
          maxPrice={maxPrice}
          onSelectFlight={handleSelectFlight}
          onBack={() => router.push("/")}
        />
      )}

      {step === "booking" && selectedFlight && (
        <BookingForm
          flight={selectedFlight}
          passengers={passengers}
          onBook={handleBook}
          onBack={() => setStep("results")}
        />
      )}

      {step === "confirmation" && selectedFlight && bookingDetails && (
        <ConfirmationView
          flight={selectedFlight}
          bookingDetails={bookingDetails}
          onNewSearch={handleNewSearch}
        />
      )}
    </main>
  );
}
