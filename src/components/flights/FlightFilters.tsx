'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFlightSearchStore } from '@/store/flightSearchStore';

interface FlightFiltersProps {
  airlines: string[];
  maxPrice: number;
}

export function FlightFilters({ airlines, maxPrice }: FlightFiltersProps) {
  const { filters, setFilters } = useFlightSearchStore();

  return (
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
                    ? 'Non-stop'
                    : stop === 1
                    ? '1 stop'
                    : '2+ stops'}
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
  );
}
