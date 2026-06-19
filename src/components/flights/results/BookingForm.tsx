'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import type { Flight, BookingDetails } from '@/lib/types';
import { formatDuration } from '@/lib/utils';

const bookingFormSchema = z.object({
  passengerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number must be at least 5 characters"),
});

interface BookingFormProps {
  flight: Flight;
  passengers: number;
  onBook: (details: BookingDetails) => void;
  onBack: () => void;
}

export function BookingForm({ flight, passengers, onBook, onBack }: BookingFormProps) {
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      passengerName: '',
      email: '',
      phone: '',
    },
  });

  const totalPrice = flight.price * passengers;

  const handleSubmit = (values: z.infer<typeof bookingFormSchema>) => {
    onBook({ ...values, flightId: flight.id });
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
                <div className="text-2xl font-bold text-primary">
                  ৳{totalPrice.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">{passengers} passenger{passengers > 1 ? 's' : ''}</div>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="passengerName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="passengerName">Full Name</Label>
                    <FormControl>
                      <Input
                        id="passengerName"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email Address</Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="phone">Phone Number</Label>
                    <FormControl>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+880 1700 000000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
              >
                Confirm Booking
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
