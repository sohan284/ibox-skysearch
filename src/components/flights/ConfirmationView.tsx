"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFlightSearchStore } from "@/store/flightSearchStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

export function ConfirmationView() {
  const router = useRouter();
  const { selectedFlight, bookingDetails, resetAll } = useFlightSearchStore();

  useEffect(() => {
    toast.success("Booking confirmed successfully!");
  }, []);

  if (!selectedFlight || !bookingDetails) return null;

  return (
    <div className="max-w-2xl mx-auto text-center">
      <Card className="shadow-xl">
        <CardContent className="p-8 md:p-12">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-primary text-4xl">✓</div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for choosing iBox SkySearch
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold mb-4">Booking Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booking Reference</span>
                <span className="font-mono font-semibold text-primary">
                  #{Math.random().toString(36).substr(2, 8).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Passenger</span>
                <span>{bookingDetails.passengerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{bookingDetails.email}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="font-bold mb-2">
                  {selectedFlight.airline} {selectedFlight.flightNumber}
                </div>
                <div className="text-muted-foreground">
                  {selectedFlight.departureTime} {selectedFlight.origin} →{" "}
                  {selectedFlight.arrivalTime} {selectedFlight.destination}
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              resetAll();
              router.push("/");
            }}
            className="bg-primary hover:bg-primary/90"
          >
            Search for Another Flight
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
