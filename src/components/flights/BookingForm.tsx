'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Flight, BookingDetails } from '@/lib/types';
import { formatDuration } from '@/lib/utils';

interface BookingFormProps {
  flight: Flight;
  passengers: number;
  onBook: (details: BookingDetails) => void;
  onBack: () => void;
}

export function BookingForm({ flight, passengers, onBook, onBack }: BookingFormProps) {
  const [formData, setFormData] = useState({
    passengerName: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBook({ ...formData, flightId: flight.id });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="justify-start px-0 mb-6">
        ← Back to Results
      </Button>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Booking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-semibold mb-3">Flight Summary</h3>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">{flight.airline} {flight.flightNumber}</div>
                <div className="text-sm text-muted-foreground">
                  {flight.departureTime} {flight.origin} → {flight.arrivalTime} {flight.destination}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDuration(flight.durationMinutes)}, {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">${flight.price * passengers}</div>
                <div className="text-sm text-muted-foreground">{passengers} passenger{passengers > 1 ? 's' : ''}</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passengerName">Full Name</Label>
              <Input
                id="passengerName"
                required
                value={formData.passengerName}
                onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Confirm Booking
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
