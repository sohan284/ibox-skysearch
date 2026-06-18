import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Flight } from '@/lib/types';
import { formatDuration } from '@/lib/utils';

interface FlightCardProps {
  flight: Flight;
  onSelect: () => void;
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold text-lg">{flight.airline}</span>
              <span className="text-sm text-muted-foreground">{flight.flightNumber}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{flight.departureTime}</div>
                <div className="text-sm text-muted-foreground">{flight.origin}</div>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="text-sm text-muted-foreground">{formatDuration(flight.durationMinutes)}</div>
                <div className="w-full h-px bg-gray-300 relative mt-2">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full" />
                  <div className="absolute left-1/2 top-1/2 -translate-y-1/2 text-gray-400">→</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{flight.arrivalTime}</div>
                <div className="text-sm text-muted-foreground">{flight.destination}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="text-3xl font-bold text-blue-600">
              ${flight.price}
              <span className="text-sm text-muted-foreground font-normal">/person</span>
            </div>
            <Button onClick={onSelect} className="bg-blue-600 hover:bg-blue-700">
              Select Flight
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
