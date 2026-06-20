"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFlightSearchStore } from "@/store/flightSearchStore";
import { getFlightById } from "@/lib/mock-data";
import { BookingForm } from "@/components/flights/BookingForm";
import { BookingFormSkeleton } from "@/components/flights/BookingFormSkeleton";

export default function BookingPage() {
  const params = useParams<{ flightId: string }>();
  const router = useRouter();
  const { selectedFlight, setSelectedFlight } = useFlightSearchStore();

  useEffect(() => {
    // Find the flight by ID
    const flight = getFlightById(params.flightId);
    if (!flight) {
      router.replace("/");
      return;
    }
    if (!selectedFlight || selectedFlight.id !== params.flightId) {
      setSelectedFlight(flight);
    }
  }, [params.flightId, selectedFlight, setSelectedFlight, router]);

  if (!selectedFlight) {
    return (
      <div className="min-h-screen py-8">
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
