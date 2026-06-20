"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFlightSearchStore } from "@/store/flightSearchStore";
import { getFlightById } from "@/lib/mock-data";
import { ConfirmationView } from "@/components/flights/ConfirmationView";
import { ConfirmationViewSkeleton } from "@/components/flights/ConfirmationViewSkeleton";

export default function ConfirmationPage() {
  const params = useParams<{ flightId: string }>();
  const router = useRouter();
  const {
    selectedFlight,
    bookingDetails,
    setSelectedFlight,
    setBookingDetails,
  } = useFlightSearchStore();

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
    // Check if we have booking details (should have been set on previous step)
    if (!bookingDetails) {
      router.replace(`/flights/${params.flightId}/booking`);
    }
  }, [
    params.flightId,
    selectedFlight,
    bookingDetails,
    setSelectedFlight,
    setBookingDetails,
    router,
  ]);

  if (!selectedFlight || !bookingDetails) {
    return (
      <div className="py-8">
        <ConfirmationViewSkeleton />
      </div>
    );
  }

  return (
    <div className="py-8">
      <ConfirmationView />
    </div>
  );
}
