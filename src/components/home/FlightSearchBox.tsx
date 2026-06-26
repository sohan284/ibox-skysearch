"use client";

import React, { useState, useEffect } from "react";
import AirportSearch from "./AirportSearch";
import DateCalender from "./DateCalender";
import SharedSelect from "@/components/shared/SharedSelect";
import { BANGLADESH_AIRPORTS, type Airport } from "@/lib/airports";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useFlightSearchStore } from "@/store/flightSearchStore";
import { toast } from "sonner";
import { CustomButton } from "../ui/CustomButton";

interface FlightSearchBoxProps {
  isModify?: boolean;
  onSearchComplete?: () => void;
}

const FlightSearchBox: React.FC<FlightSearchBoxProps> = ({
  isModify = false,
  onSearchComplete,
}) => {
  const router = useRouter();

  // Get store
  const { origin, destination, date, passengers: storePassengers, setOrigin, setDestination, setDate, setPassengers, resetAll } =
    useFlightSearchStore();

  const [passengers, setPassengersCount] = useState(() => storePassengers || 1);
  const [fromAirport, setFromAirport] = useState<Airport | null>(() => {
    if (origin) {
      return BANGLADESH_AIRPORTS.find((a) => a.code === origin) || null;
    }
    return BANGLADESH_AIRPORTS.find((airport) => airport.code === "DAC") || null;
  });
  const [toAirport, setToAirport] = useState<Airport | null>(() => {
    if (destination) {
      return BANGLADESH_AIRPORTS.find((a) => a.code === destination) || null;
    }
    return BANGLADESH_AIRPORTS.find((airport) => airport.code === "CXB") || null;
  });
  const [departureDate, setDepartureDate] = useState<Date | null>(() => {
    if (!date) return new Date();
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day); // local time parse (no UTC offset shift)
  });

  const handleSearchFlight = () => {
    // Validate
    if (fromAirport && toAirport && fromAirport.code === toAirport.code) {
      toast.warning("Origin and destination airports cannot be the same!");
      return;
    }
    if (!departureDate) {
      toast.warning("Please select a departure date!");
      return;
    }

    const totalPassengers = passengers;
    const formattedDate = departureDate
      ? format(departureDate, "yyyy-MM-dd")
      : "";

    // Update store
    setOrigin(fromAirport?.code || "");
    setDestination(toAirport?.code || "");
    setDate(formattedDate);
    setPassengers(totalPassengers);

    const params = new URLSearchParams({
      origin: fromAirport?.code || "",
      destination: toAirport?.code || "",
      date: formattedDate,
      passengers: totalPassengers.toString(),
    });

    router.push(`/flights?${params.toString()}`);
    if (onSearchComplete) {
      onSearchComplete();
    }
  };

  return (
    <div>
      <div className="relative max-w-3xl mx-auto">
        <div className="bg-primary/5 rounded-xl p-5 border-dotted border-gray-300">
          <div className="space-y-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <AirportSearch
                label="ORIGIN"
                value={fromAirport}
                onChange={setFromAirport}
              />
              <AirportSearch
                label="DESTINATION"
                value={toAirport}
                onChange={setToAirport}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <DateCalender
                selectedDate={departureDate}
                setSelectedDate={setDepartureDate}
              />
              <SharedSelect
                label="PASSENGERS"
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                value={passengers}
                onChange={setPassengersCount}
              />
            </div>
          </div>
          <div className="mt-6">
            <CustomButton
              variant="gradient"
              size="lg"
              className="w-full"
              onClick={handleSearchFlight}
            >
              SEARCH FOR FLIGHT
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchBox;
