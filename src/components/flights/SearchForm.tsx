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

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: "",
      destination: "",
      passengers: "1",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSearch({
      origin: values.origin,
      destination: values.destination,
      date: format(values.date, "yyyy-MM-dd"),
      passengers: parseInt(values.passengers),
    });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Search Flights</CardTitle>
        </CardHeader>
        <CardContent>
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
                      <label className="text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
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
                      <label className="text-sm font-medium text-gray-700 mb-2">
                        Passengers
                      </label>
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
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                ) : null}
                Search Flights
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
