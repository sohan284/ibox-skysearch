"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ResultsView } from "./ResultsView";
import { useFlightSearchStore } from "@/store/flightSearchStore";

export function FlightsClient() {
  const searchParams = useSearchParams();
  const {
    origin: storeOrigin,
    destination: storeDestination,
    date: storeDate,
    passengers: storePassengers,
    setOrigin,
    setDestination,
    setDate,
    setPassengers,
  } = useFlightSearchStore();

  // Sync URL params to store
  useEffect(() => {
    const urlOrigin = searchParams.get("origin");
    const urlDestination = searchParams.get("destination");
    const urlDate = searchParams.get("date");
    const urlPassengers = Number(searchParams.get("passengers") || "1");

    if (urlOrigin && urlOrigin !== storeOrigin) setOrigin(urlOrigin);
    if (urlDestination && urlDestination !== storeDestination) setDestination(urlDestination);
    if (urlDate && urlDate !== storeDate) setDate(urlDate);
    if (urlPassengers !== storePassengers) setPassengers(urlPassengers);
  }, [searchParams, storeOrigin, storeDestination, storeDate, storePassengers, setOrigin, setDestination, setDate, setPassengers]);

  return (
    <main className="py-8">
      <ResultsView />
    </main>
  );
}
