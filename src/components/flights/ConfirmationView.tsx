"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFlightSearchStore } from "@/store/flightSearchStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import { formatDuration } from "@/lib/utils";

export function ConfirmationView() {
  const router = useRouter();
  const {
    selectedFlight,
    bookingDetails,
    resetAll,
    origin,
    destination,
    date,
    passengers,
  } = useFlightSearchStore();

  useEffect(() => {
    toast.success("Booking confirmed successfully!");
  }, []);

  if (!selectedFlight || !bookingDetails) return null;

  return (
    <div className="text-center">
      <Button
        variant="ghost"
        onClick={() => {
          const params = new URLSearchParams({
            origin: origin,
            destination: destination,
            date: date,
            passengers: passengers.toString(),
          });
          router.push(`/flights?${params.toString()}`);
        }}
        className="justify-start w-full px-0 mb-6"
      >
        ← Back to Results
      </Button>
      <Card className="max-w-3xl mx-auto transition-all duration-300 border-2 border-gray-100">
        <CardContent className="p-8 ">
          <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-primary text-4xl">✓</div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-4">
            Thank you for choosing iBox SkySearch
          </p>

          <div className="bg-primary/5 rounded-xl p-5 border border-gray-200 mb-8 text-left">
            <h3 className="font-semibold mb-4">Booking Details</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Booking Reference</span>
                <span className="font-mono font-semibold text-primary text-lg">
                  #{Math.random().toString(36).substr(2, 8).toUpperCase()}
                </span>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-bold text-lg text-black">
                    {selectedFlight.airline}
                  </span>
                  <span className="text-sm text-muted-foreground bg-gray-100 px-3 py-1 rounded-full">
                    {selectedFlight.flightNumber}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">
                      {selectedFlight.departureTime}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedFlight.origin}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-sm text-muted-foreground">
                      {formatDuration(selectedFlight.durationMinutes)}
                    </div>
                    <div className="w-full h-px bg-gray-200 relative mt-2">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" />
                      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 text-primary">
                        →
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {selectedFlight.stops === 0
                        ? "Non-stop"
                        : `${selectedFlight.stops} stop${selectedFlight.stops > 1 ? "s" : ""}`}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">
                      {selectedFlight.arrivalTime}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedFlight.destination}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <p className="text-muted-foreground font-medium mb-3">
                  Passengers:
                </p>
                <div className="space-y-3">
                  {bookingDetails.passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 flex items-center justify-center bg-primary/10 text-primary rounded-full text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-gray-800">
                          {passenger.fullName}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Email:</span>
                          <span>{passenger.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Phone:</span>
                          <span>{passenger.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              router.push("/");
            }}
          >
            Search for Another Flight
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
