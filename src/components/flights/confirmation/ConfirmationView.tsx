"use client";

import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/CustomButton";
import { Card, CardContent } from "@/components/ui/card";
import { useFlightSearchStore } from "@/store/flightSearchStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { FlightSummary } from "../FlightSummary";

export function ConfirmationView() {
  const router = useRouter();
  const toastShown = useRef(false);
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
    if (!toastShown.current) {
      toast.success("Booking confirmed successfully!");
      toastShown.current = true;
    }
  }, []);

  if (!selectedFlight || !bookingDetails) return null;

  return (
    <div className="text-center">

      <button
        onClick={() => {
          const params = new URLSearchParams({
            origin: origin,
            destination: destination,
            date: date,
            passengers: passengers.toString(),
          });
          router.push(`/flights?${params.toString()}`);
        }}
        className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium mb-6"
      >
        <RiArrowLeftLine size={18} />
        <span className="text-sm">Back to Result</span>
      </button>
      <Card className=" mx-auto transition-all duration-300 border-2 border-gray-100">
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
                <FlightSummary flight={selectedFlight} passengerCount={passengers} />
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

          <CustomButton
            className="px-3"
            onClick={() => {
              router.push("/");
            }}
          >
            Search for Another Flight
          </CustomButton>
        </CardContent>
      </Card>
    </div>
  );
}
