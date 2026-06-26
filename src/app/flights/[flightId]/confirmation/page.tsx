"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFlightSearchStore } from "@/store/flightSearchStore";
import { getFlightById } from "@/lib/api/flights";
import { ConfirmationView } from "@/components/flights/confirmation/ConfirmationView";
import { ConfirmationViewSkeleton } from "@/components/flights/confirmation/ConfirmationViewSkeleton";

export default function ConfirmationPage() {
  const params = useParams<{ flightId: string }>();
  const router = useRouter();
  const {
    selectedFlight,
    bookingDetails,
    setSelectedFlight,
    setBookingDetails,
  } = useFlightSearchStore();
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
      // Check if we have booking details (should have been set on previous step)
      if (!bookingDetails) {
        router.replace(`/flights/${params.flightId}/booking`);
      }
      setIsLoading(false);
    }
    fetchFlight();
  }, [
    params.flightId,
    selectedFlight,
    bookingDetails,
    setSelectedFlight,
    setBookingDetails,
    router,
  ]);

  if (isLoading || !selectedFlight || !bookingDetails) {
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
