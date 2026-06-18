"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { AirportCombobox } from "@/components/flights/AirportCombobox";
import { useFlightSearchStore } from "@/store/flightSearchStore";

const formSchema = z.object({
  origin: z.string().min(2, {
    message: "Please select a departure airport.",
  }),
  destination: z.string().min(2, {
    message: "Please select an arrival airport.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  passengers: z.string().min(1, {
    message: "Passengers is required.",
  }),
});

interface SearchFormProps {
  onSearch: (searchParams: {
    origin: string;
    destination: string;
    date: string;
    passengers: number;
  }) => void;
  isLoading?: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const {
    origin,
    destination,
    date,
    passengers,
    setOrigin,
    setDestination,
    setDate: setStoreDate,
    setPassengers: setStorePassengers,
  } = useFlightSearchStore();

  // Convert string date from store to Date object for react-hook-form
  const initialDate = date ? new Date(date) : new Date();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin,
      destination,
      date: initialDate,
      passengers: passengers.toString(),
    },
  });

  // Watch form values to update store on change
  const watchOrigin = form.watch("origin");
  const watchDestination = form.watch("destination");
  const watchDate = form.watch("date");
  const watchPassengers = form.watch("passengers");

  React.useEffect(() => {
    if (watchOrigin !== undefined) setOrigin(watchOrigin);
  }, [watchOrigin, setOrigin]);

  React.useEffect(() => {
    if (watchDestination !== undefined) setDestination(watchDestination);
  }, [watchDestination, setDestination]);

  React.useEffect(() => {
    if (watchDate) {
      setStoreDate(format(watchDate, "yyyy-MM-dd"));
    }
  }, [watchDate, setStoreDate]);

  React.useEffect(() => {
    if (watchPassengers !== undefined) {
      setStorePassengers(parseInt(watchPassengers || "1"));
    }
  }, [watchPassengers, setStorePassengers]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const searchDate = format(values.date, "yyyy-MM-dd");

    onSearch({
      origin: values.origin,
      destination: values.destination,
      date: searchDate,
      passengers: parseInt(values.passengers),
    });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-none overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#007eff] to-[#005bb5] text-white p-6">
          <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6.5 21 5 20 4s-2.5 1-3.5 2L13 8l-8.2-1.8c-.7-.1-1.4.4-1.4 1.1 0 .5.3 1 .7 1.3L8 11l-1.7 4.9c-.2.6 0 1.3.5 1.7l1.7 1.7c.4.4 1.1.6 1.7.5L13 16l2.5 2.5c.3.4.8.7 1.3.7.1 0 .3 0 .4-.1.7-.3 1.2-1 .9-1.6z" />
            </svg>
            Find Your Perfect Flight
          </CardTitle>
          <p className="text-white/90 mt-2">
            Search and book flights in minutes
          </p>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Controller
                          control={form.control}
                          name="origin"
                          render={({ field }) => (
                            <AirportCombobox
                              value={field.value}
                              onChange={field.onChange}
                              label="From"
                              placeholder="Select departure airport"
                              type="departure"
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Controller
                          control={form.control}
                          name="destination"
                          render={({ field }) => (
                            <AirportCombobox
                              value={field.value}
                              onChange={field.onChange}
                              label="To"
                              placeholder="Select arrival airport"
                              type="arrival"
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                        <label className="text-sm font-medium text-gray-700">
                          Date
                        </label>
                      </div>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          onSelect={field.onChange}
                          placeholder="Select a date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passengers"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <label className="text-sm font-medium text-gray-700">
                          Passengers
                        </label>
                      </div>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select number of passengers" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Passenger" : "Passengers"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#007eff] to-[#005bb5] hover:from-[#005bb5] hover:to-[#004494] text-white font-semibold text-lg shadow-lg transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.8 19.2 16 11l3.5-3.5C21 6.5 21 5 20 4s-2.5 1-3.5 2L13 8l-8.2-1.8c-.7-.1-1.4.4-1.4 1.1 0 .5.3 1 .7 1.3L8 11l-1.7 4.9c-.2.6 0 1.3.5 1.7l1.7 1.7c.4.4 1.1.6 1.7.5L13 16l2.5 2.5c.3.4.8.7 1.3.7.1 0 .3 0 .4-.1.7-.3 1.2-1 .9-1.6z" />
                    </svg>
                    Search Flights
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
