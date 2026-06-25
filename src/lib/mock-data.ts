import type { Flight } from "./types";
import { BANGLADESH_AIRPORTS } from "./airports";

// Helper to get dates for the next 5 days (including today)
const getNext5Days = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to midnight to avoid time issues
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split("T")[0]); // YYYY-MM-DD
  }
  return dates;
};

const next5Days = getNext5Days();

const BD_AIRLINES = [
  "Biman Bangladesh Airlines",
  "NovoAir",
  "US-Bangla Airlines",
  "Air Astra",
];

const DEPARTURE_TIMES = [
  "07:00",
  "08:30",
  "10:00",
  "11:30",
  "13:00",
  "14:30",
  "16:00",
  "17:30",
  "19:00",
];

// Generate all possible routes (every origin to every other destination)
const ROUTES: { origin: string; destination: string }[] = [];
BANGLADESH_AIRPORTS.forEach((origin) => {
  BANGLADESH_AIRPORTS.forEach((destination) => {
    if (origin.code !== destination.code) {
      ROUTES.push({ origin: origin.code, destination: destination.code });
    }
  });
});

const generateFlight = (
  id: number,
  route: { origin: string; destination: string },
  date: string,
  airline: string,
  departureTime: string
): Flight => {
  const durationMinutes = 45 + Math.floor(Math.random() * 30); // 45-75 mins
  const stops = Math.random() > 0.8 ? 1 : 0; // 20% chance 1 stop
  const classType = Math.random() > 0.9 ? "Business" : "Economy";
  const refundable = Math.random() > 0.3;
  const cabinBaggage = classType === "Business" ? "10 kg" : "7 kg";
  const checkedBaggage = classType === "Business" ? "35 kg" : "20 kg";

  let basePrice = 3000 + Math.floor(Math.random() * 5000); // 3000-8000 BDT
  if (classType === "Business") {
    basePrice *= 2;
  }

  // Calculate arrival time
  const [hours, minutes] = departureTime.split(":").map(Number);
  let arrivalHours = hours + Math.floor((minutes + durationMinutes) / 60);
  const arrivalMinutes = (minutes + durationMinutes) % 60;

  return {
    id: `BD-${id}`,
    airline,
    flightNumber: `${airline.substring(0, 2).toUpperCase()}${100 + id}`,
    origin: route.origin,
    destination: route.destination,
    departureTime,
    arrivalTime: `${arrivalHours.toString().padStart(2, "0")}:${arrivalMinutes.toString().padStart(2, "0")}`,
    durationMinutes,
    stops,
    price: basePrice,
    currency: "BDT",
    date,
    classType,
    refundable,
    cabinBaggage,
    checkedBaggage,
  };
};

// Generate flights: multiple airlines, multiple times, all routes, all 5 dates
const allFlights: Flight[] = [];
let flightId = 1;

ROUTES.forEach((route) => {
  next5Days.forEach((date) => {
    BD_AIRLINES.forEach((airline) => {
      // Generate 2-3 flights per airline per route per date
      const numFlights = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < numFlights; i++) {
        const departureTime = DEPARTURE_TIMES[Math.floor(Math.random() * DEPARTURE_TIMES.length)];
        allFlights.push(
          generateFlight(flightId++, route, date, airline, departureTime)
        );
      }
    });
  });
});

export const MOCK_FLIGHTS: Flight[] = allFlights;
