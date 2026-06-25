import type { Flight } from "@/lib/types";
import { MOCK_FLIGHTS } from "@/lib/mock-data";

export interface GetFlightsParams {
  origin?: string;
  destination?: string;
  date?: string;
}

export async function getFlights(params?: GetFlightsParams): Promise<Flight[]> {
  // In real app, this would be a fetch call to your backend API
  // await new Promise(resolve => setTimeout(resolve, 300));
  let flights = MOCK_FLIGHTS;
  
  if (params?.origin) {
    flights = flights.filter(flight => flight.origin === params.origin);
  }
  if (params?.destination) {
    flights = flights.filter(flight => flight.destination === params.destination);
  }
  if (params?.date) {
    flights = flights.filter(flight => flight.date === params.date);
  }
  
  return flights;
}

export async function getFlightById(id: string): Promise<Flight | null> {
  // In real app, this would be a fetch call to your backend API
  // await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_FLIGHTS.find(flight => flight.id === id) || null;
}
