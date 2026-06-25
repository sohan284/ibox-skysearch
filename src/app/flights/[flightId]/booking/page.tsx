"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFlightSearchStore } from "@/store/flightSearchStore";
import { getFlightById } from "@/lib/api/flights";
import { BookingForm } from "@/components/flights/BookingForm";
import { BookingFormSkeleton } from "@/components/flights/BookingFormSkeleton";

export default function BookingPage() {
  const params = useParams<{ flightId: string }>();
  const router = useRouter();
  const { selectedFlight, setSelectedFlight } = useFlightSearchStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFlight() {
      setIsLoading(true);
      // Find the flight by ID using our API layer
      const flight = await getFlightById(params.flightId);
      if (!flight) {
        router.replace("/");
        return;
      }
      if (!selectedFlight || selectedFlight.id !== params.flightId) {
        setSelectedFlight(flight);
      }
      setIsLoading(false);
    }
    fetchFlight();
  }, [params.flightId, selectedFlight, setSelectedFlight, router]);

  if (isLoading || !selectedFlight) {
    return (
      <div className=" py-8">
        <BookingFormSkeleton />
      </div>
    );
  }

  return (
    <div className="py-8">
      <BookingForm />
    </div>
  );
}
