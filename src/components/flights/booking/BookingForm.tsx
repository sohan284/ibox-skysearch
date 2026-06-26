"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomInput } from "@/components/ui/CustomInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { useFlightSearchStore } from "@/store/flightSearchStore";
import { Passenger } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FlightSummary } from "../FlightSummary";
import { RiArrowLeftLine } from "react-icons/ri";

const bookingFormSchema = z.object({
  passengers: z
    .array(
      z.object({
        fullName: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(5, "Phone number must be at least 5 characters"),
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
      passengers: Array.from({ length: passengers }, () => ({
        fullName: "",
        email: "",
        phone: "",
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
      passengers: values.passengers as Passenger[],
    });
    router.push(`/flights/${selectedFlight.id}/confirmation`);
  };

  return (
    <div>

      <button
        onClick={() => {
          const params = new URLSearchParams({
            origin: origin,
            destination: destination,
            date: date,
            passengers: passengers.toString(),
          });
          router.push(`/flights?${params.toString()}`);
        }}
        className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium mb-6"
      >
        <RiArrowLeftLine size={18} />
        <span className="text-sm">Back to Result</span>
      </button>
      <Card className=" mx-auto transition-all duration-300 border-2 border-gray-100 hover:border-primary/30">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Booking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold mb-3">Flight Summary</h3>
            <FlightSummary flight={selectedFlight} passengerCount={passengers} />
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="space-y-4">
                <h3 className="font-semibold">Passengers</h3>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <h4 className="font-medium mb-3">Passenger {index + 1}</h4>
                    <div className="space-y-3 grid lg:grid-cols-3 gap-3">
                      <FormField
                        control={form.control}
                        name={`passengers.${index}.fullName`}
                        render={({ field: inputField }) => (
                          <CustomInput
                            id={`passengers.${index}.fullName`}
                            label="Full Name"
                            placeholder="Full Name"
                            {...inputField}
                          />
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`passengers.${index}.email`}
                        render={({ field: inputField }) => (
                          <CustomInput
                            id={`passengers.${index}.email`}
                            label="Email"
                            type="email"
                            placeholder="email@example.com"
                            {...inputField}
                          />
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`passengers.${index}.phone`}
                        render={({ field: inputField }) => (
                          <CustomInput
                            id={`passengers.${index}.phone`}
                            label="Phone"
                            type="tel"
                            placeholder="+880 1700 000000"
                            {...inputField}
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <CustomButton type="submit" size="lg" className="w-full">
                Confirm Booking
              </CustomButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
