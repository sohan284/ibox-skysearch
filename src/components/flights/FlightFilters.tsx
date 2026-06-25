'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useFlightSearchStore } from '@/store/flightSearchStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { STOP_OPTIONS, SORT_OPTIONS } from '@/lib/constants';
import { SortOption } from '@/lib/types';

interface FlightFiltersProps {
  airlines: string[];
  maxPrice: number;
}

export function FlightFilters({ airlines, maxPrice }: FlightFiltersProps) {
  const { filters, setFilters, sort, setSort } = useFlightSearchStore();

  return (
    <Card className="sticky top-8">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Filters & Sorting</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setFilters({
                airlines: [],
                stops: [],
                minPrice: 0,
                maxPrice,
                classTypes: [],
                refundableOnly: false,
              });
              setSort("price-asc");
            }}
            className="text-primary hover:text-primary/90"
          >
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sort By */}
        <div className="space-y-2  border-gray-100">
          <Label>Sort by</Label>
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as SortOption)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Airlines</Label>
          <div className="space-y-2">
            {airlines.map((airline) => (
              <label
                key={airline}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  checked={filters.airlines.includes(airline)}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      airlines: checked
                        ? [...prev.airlines, airline]
                        : prev.airlines.filter((a) => a !== airline),
                    }));
                  }}
                />
                <span className="text-sm">{airline}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Stops</Label>
          <div className="space-y-2">
            {STOP_OPTIONS.map((stop) => (
              <label
                key={stop.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  checked={filters.stops.includes(stop.value)}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      stops: checked
                        ? [...prev.stops, stop.value]
                        : prev.stops.filter((s) => s !== stop.value),
                    }));
                  }}
                />
                <span className="text-sm">
                  {stop.label}
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

        {/* Cabin Class Filter */}
        <div className="space-y-3">
          <Label>Cabin Class</Label>
          <div className="space-y-2">
            {(["Economy", "Business"] as const).map((cls) => (
              <label
                key={cls}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  checked={filters.classTypes?.includes(cls) || false}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      classTypes: checked
                        ? [...(prev.classTypes || []), cls]
                        : (prev.classTypes || []).filter((c) => c !== cls),
                    }));
                  }}
                />
                <span className="text-sm">{cls} Class</span>
              </label>
            ))}
          </div>
        </div>

        {/* Refundability Filter */}
        <div className="space-y-3">
          <Label>Ticket Option</Label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.refundableOnly || false}
                onCheckedChange={(checked) => {
                  setFilters((prev) => ({
                    ...prev,
                    refundableOnly: !!checked,
                  }));
                }}
              />
              <span className="text-sm">Refundable Flights Only</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
