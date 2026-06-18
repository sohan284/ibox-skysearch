import type { Flight } from "./types";

// Helper to get dates for the next 5 days
const getNext5Days = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
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

const ROUTES = [
  { origin: "DAC", destination: "CGP" }, // Dhaka to Chittagong
  { origin: "DAC", destination: "CXB" }, // Dhaka to Cox's Bazar
  { origin: "DAC", destination: "ZYL" }, // Dhaka to Sylhet
  { origin: "DAC", destination: "JSR" }, // Dhaka to Jessore
  { origin: "DAC", destination: "MXR" }, // Dhaka to Rajshahi
  { origin: "CGP", destination: "DAC" }, // Chittagong to Dhaka
  { origin: "CXB", destination: "DAC" }, // Cox's Bazar to Dhaka
  { origin: "ZYL", destination: "DAC" }, // Sylhet to Dhaka
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

const generateFlight = (id: number): Flight => {
  const route = ROUTES[id % ROUTES.length];
  const date = next5Days[id % next5Days.length];
  const airline = BD_AIRLINES[id % BD_AIRLINES.length];
  const departureTime = DEPARTURE_TIMES[id % DEPARTURE_TIMES.length];
  const durationMinutes = 45 + Math.floor(Math.random() * 30); // 45-75 mins
  const stops = Math.random() > 0.8 ? 1 : 0; // 20% chance 1 stop
  const basePrice = 3000 + Math.floor(Math.random() * 5000); // 3000-8000 BDT

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
  };
};

// Generate 30+ flights
export const MOCK_FLIGHTS: Flight[] = Array.from({ length: 35 }, (_, i) =>
  generateFlight(i + 1),
);
