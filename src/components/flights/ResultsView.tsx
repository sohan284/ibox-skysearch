"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlightCard } from "./FlightCard";
import { FlightFilters } from "./FlightFilters";
import { useFlightSearchStore } from "@/store/flightSearchStore";
import { useRouter } from "next/navigation";
import { MOCK_FLIGHTS } from "@/lib/mock-data";
import { filterFlights, sortFlights, getUniqueAirlines } from "@/lib/utils";
import { useMemo } from "react";

export function ResultsView() {
  const router = useRouter();
  const { filters, sort, setSort, setSelectedFlight } = useFlightSearchStore();

  // Get search params from store to filter flights
  const { origin, destination, date } = useFlightSearchStore();

  // Calculate derived values
  const searchFilteredFlights = useMemo(() => {
    return MOCK_FLIGHTS.filter((flight) => {
      if (origin && flight.origin !== origin) return false;
      if (destination && flight.destination !== destination) return false;
      if (date && flight.date !== date) return false;
      return true;
    });
  }, [origin, destination, date]);

  const airlines = useMemo(
    () => getUniqueAirlines(searchFilteredFlights),
    [searchFilteredFlights],
  );

  const maxPrice = useMemo(() => {
    if (searchFilteredFlights.length === 0) return 0;
    return Math.max(...searchFilteredFlights.map((f) => f.price));
  }, [searchFilteredFlights]);

  // Apply filters and sort
  const filteredFlights = useMemo(() => {
    return sortFlights(
      filterFlights(searchFilteredFlights, {
        ...filters,
        maxPrice:
          filters.maxPrice === 0 || filters.maxPrice === 1000000
            ? maxPrice
            : filters.maxPrice,
      }),
      sort,
    );
  }, [filters, sort, searchFilteredFlights, maxPrice]);

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Filters Sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-[calc(50px+52px)]">
            <FlightFilters airlines={airlines} maxPrice={maxPrice} />
          </div>
        </div>

        {/* Right Flight Cards */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Label className="mb-0">Sort by:</Label>
              <Select
                value={sort}
                onValueChange={(value) => setSort(value as any)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="duration-asc">
                    Duration: Shortest
                  </SelectItem>
                  <SelectItem value="departure-asc">
                    Departure: Earliest
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredFlights.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 text-6xl mb-4">✈️</div>
                <h3 className="text-xl font-semibold mb-2">No flights found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more options.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onSelect={() => {
                  setSelectedFlight(flight);
                  router.push(`/flights/${flight.id}/booking`);
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
