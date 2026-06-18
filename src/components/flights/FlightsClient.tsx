"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
    maxPrice: 1000,
  });
  const [sort, setSort] = useState<SortOption>("price-asc");
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null,
  );

  const airlines = useMemo(() => getUniqueAirlines(MOCK_FLIGHTS), []);
  const maxPrice = useMemo(
    () => Math.max(...MOCK_FLIGHTS.map((f) => f.price)),
    [],
  );

  const filteredFlights = useMemo(() => {
    return sortFlights(filterFlights(MOCK_FLIGHTS, filters), sort);
  }, [filters, sort]);

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
