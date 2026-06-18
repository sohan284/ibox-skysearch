import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Flight, BookingDetails } from '@/lib/types';

interface ConfirmationViewProps {
  flight: Flight;
  bookingDetails: BookingDetails;
  onNewSearch: () => void;
}

export function ConfirmationView({
  flight,
  bookingDetails,
  onNewSearch,
}: ConfirmationViewProps) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <Card className="shadow-xl">
        <CardContent className="p-8 md:p-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-green-600 text-4xl">✓</div>
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
                <span className="font-mono font-semibold">
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
                <div className="font-bold mb-2">{flight.airline} {flight.flightNumber}</div>
                <div className="text-muted-foreground">
                  {flight.departureTime} {flight.origin} → {flight.arrivalTime} {flight.destination}
                </div>
              </div>
            </div>
          </div>

          <Button onClick={onNewSearch} className="bg-blue-600 hover:bg-blue-700">
            Search for Another Flight
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
