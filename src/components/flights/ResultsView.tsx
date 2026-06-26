"use client";

import { useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoClose } from "react-icons/io5";
import { FlightCard } from "./FlightCard";
import { FlightCardSkeleton } from "./FlightCardSkeleton";
import { FlightFilters } from "./FlightFilters";
import { useFlightSearchStore } from "@/store/flightSearchStore";
import { useRouter } from "next/navigation";
import { filterFlights, sortFlights, getUniqueAirlines } from "@/lib/utils";
import { useMemo } from "react";
import { APP_CONSTANTS, SORT_OPTIONS } from "@/lib/constants";
import type { SortOption } from "@/lib/types";
import { useFlights } from "@/hooks/useFlights";

export function ResultsView() {
  const router = useRouter();
  const { filters, sort, setSort, setSelectedFlight } = useFlightSearchStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Get search params from store to filter flights
  const { origin, destination, date } = useFlightSearchStore();
  const { data: searchFilteredFlights, isLoading, error } = useFlights(origin, destination, date);

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
          filters.maxPrice === 0 || filters.maxPrice === APP_CONSTANTS.MAX_PRICE_DEFAULT
            ? maxPrice
            : filters.maxPrice,
      }),
      sort,
    );
  }, [filters, sort, searchFilteredFlights, maxPrice]);

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Filters Sticky (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-[calc(50px+52px)]">
            <FlightFilters airlines={airlines} maxPrice={maxPrice} />
          </div>
        </div>

        {/* Right Flight Cards */}
        <div className="lg:col-span-4 lg:col-start-2 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Filter Button (Mobile Only) */}
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="left">
                <DrawerTrigger asChild className="lg:hidden">
                  <Button variant="default" size="sm">
                    Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="flex flex-row items-center justify-between border-b p-4">
                    <DrawerTitle className="text-lg font-semibold">Filters</DrawerTitle>
                    <DrawerClose asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
                        <IoClose className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </DrawerClose>
                  </DrawerHeader>
                  <div className="p-4 flex-1 overflow-y-auto">
                    <FlightFilters airlines={airlines} maxPrice={maxPrice} />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

          {error ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
                <p className="text-muted-foreground">{error.message}</p>
              </CardContent>
            </Card>
          ) : isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <FlightCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredFlights.length === 0 ? (
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
