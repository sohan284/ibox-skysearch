"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Flight, Filters, SortOption } from "@/lib/types";
import { FlightCard } from "./FlightCard";

interface ResultsViewProps {
  flights: Flight[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  sort: SortOption;
  setSort: React.Dispatch<React.SetStateAction<SortOption>>;
  airlines: string[];
  maxPrice: number;
  onSelectFlight: (flight: Flight) => void;
  onBack: () => void;
}

export function ResultsView({
  flights,
  filters,
  setFilters,
  sort,
  setSort,
  airlines,
  maxPrice,
  onSelectFlight,
  onBack,
}: ResultsViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <Card className="sticky top-8">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Filters</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setFilters({ airlines: [], stops: [], minPrice: 0, maxPrice })
                }
                className="text-primary hover:text-primary/90"
              >
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Airlines</Label>
              <div className="space-y-2">
                {airlines.map((airline) => (
                  <label
                    key={airline}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.airlines.includes(airline)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFilters((prev) => ({
                          ...prev,
                          airlines: checked
                            ? [...prev.airlines, airline]
                            : prev.airlines.filter((a) => a !== airline),
                        }));
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{airline}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Stops</Label>
              <div className="space-y-2">
                {[0, 1, 2].map((stop) => (
                  <label
                    key={stop}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.stops.includes(stop)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFilters((prev) => ({
                          ...prev,
                          stops: checked
                            ? [...prev.stops, stop]
                            : prev.stops.filter((s) => s !== stop),
                        }));
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">
                      {stop === 0
                        ? "Non-stop"
                        : stop === 1
                          ? "1 Stop"
                          : "2+ Stops"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>
                Price: ৳{filters.minPrice.toLocaleString()} - ৳
                {filters.maxPrice.toLocaleString()}
              </Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="0"
                  max={maxPrice}
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: Number(e.target.value),
                    }))
                  }
                />
                <Input
                  type="number"
                  min="0"
                  max={maxPrice}
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="justify-start px-0 text-primary"
          >
            ← Back to Search
          </Button>
          <div className="flex items-center gap-3">
            <Label className="mb-0">Sort by:</Label>
            <Select
              value={sort}
              onValueChange={(value) => setSort(value as SortOption)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="duration-asc">Duration: Shortest</SelectItem>
                <SelectItem value="departure-asc">
                  Departure: Earliest
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {flights.length === 0 ? (
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
          flights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onSelect={() => onSelectFlight(flight)}
            />
          ))
        )}
      </div>
    </div>
  );
}
