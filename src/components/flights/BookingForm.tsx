"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { formatDuration } from "@/lib/utils";
import { useFlightSearchStore } from "@/store/flightSearchStore";
import { Passenger } from "@/lib/types";
import { useRouter } from "next/navigation";

const bookingFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number must be at least 5 characters"),
  passengers: z
    .array(
      z.object({
        fullName: z.string().min(2, "Name must be at least 2 characters"),
      }),
    )
    .min(1, "At least one passenger is required"),
});

export function BookingForm() {
  const router = useRouter();
  const {
    selectedFlight,
    passengers,
    setBookingDetails,
    origin,
    destination,
    date,
  } = useFlightSearchStore();

  if (!selectedFlight) return null;

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      passengers: Array.from({ length: passengers }, () => ({
        fullName: "",
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "passengers",
  });

  const totalPrice = selectedFlight.price * passengers;

  const handleSubmit = (values: z.infer<typeof bookingFormSchema>) => {
    setBookingDetails({
      flightId: selectedFlight.id,
      email: values.email,
      phone: values.phone,
      passengers: values.passengers as Passenger[],
    });
    router.push(`/flights/${selectedFlight.id}/confirmation`);
  };

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => {
          const params = new URLSearchParams({
            origin: origin,
            destination: destination,
            date: date,
            passengers: passengers.toString(),
          });
          router.push(`/flights?${params.toString()}`);
        }}
        className="justify-start px-0 mb-6"
      >
        ← Back to Results
      </Button>

      <Card className=" transition-all duration-300 border-2 border-gray-100 hover:border-primary/30">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Booking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold mb-3">Flight Summary</h3>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-bold text-lg text-black">
                    {selectedFlight.airline}
                  </span>
                  <span className="text-sm text-muted-foreground bg-gray-100 px-3 py-1 rounded-full">
                    {selectedFlight.flightNumber}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">
                      {selectedFlight.departureTime}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedFlight.origin}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-sm text-muted-foreground">
                      {formatDuration(selectedFlight.durationMinutes)}
                    </div>
                    <div className="w-full h-px bg-gray-200 relative mt-2">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" />
                      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 text-primary">
                        →
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {selectedFlight.stops === 0
                        ? "Non-stop"
                        : `${selectedFlight.stops} stop${selectedFlight.stops > 1 ? "s" : ""}`}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">
                      {selectedFlight.arrivalTime}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedFlight.destination}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-4">
                <div className="text-3xl font-bold text-primary">
                  ৳{totalPrice.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {passengers} passenger{passengers > 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="space-y-3">
                <h3 className="font-semibold">Passengers</h3>
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`passengers.${index}.fullName`}
                    render={({ field: inputField }) => (
                      <FormItem>
                        <Label
                          htmlFor={`passengers.${index}.fullName`}
                          className="font-medium"
                        >
                          Passenger {index + 1} - Full Name
                        </Label>
                        <FormControl>
                          <Input
                            id={`passengers.${index}.fullName`}
                            placeholder={`Passenger ${index + 1} Name`}
                            className="border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                            {...inputField}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email" className="font-medium">
                        Email Address
                      </Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
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
                      <Label htmlFor="phone" className="font-medium">
                        Phone Number
                      </Label>
                      <FormControl>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+880 1700 000000"
                          className="border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300"
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
