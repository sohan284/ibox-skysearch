import { FlightsClient } from "@/components/flights/FlightsClient";
import { SearchInfoBar } from "@/components/flights/SearchInfoBar";
import { BANGLADESH_AIRPORTS } from "@/lib/airports";
import type { Metadata } from "next";

interface FlightsPageProps {
  searchParams: Promise<{
    origin?: string;
    destination?: string;
    date?: string;
    passengers?: string;
  }>;
}

export async function generateMetadata({ searchParams }: FlightsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const origin = params.origin || "";
  const destination = params.destination || "";

  const originAirport = BANGLADESH_AIRPORTS.find((a) => a.code === origin);
  const destAirport = BANGLADESH_AIRPORTS.find((a) => a.code === destination);

  if (originAirport && destAirport) {
    return {
      title: `Flights from ${originAirport.city} (${origin}) to ${destAirport.city} (${destination}) - iBox SkySearch`,
      description: `Compare and book cheap flights from ${originAirport.name} to ${destAirport.name}. Find the best airline tickets and flight deals.`,
    };
  }

  return {
    title: "Search Flights - iBox SkySearch",
    description: "Compare flights and book cheap flights for your trip with iBox SkySearch.",
  };
}

export default async function FlightsPage({ searchParams }: FlightsPageProps) {
  const params = await searchParams;
  const origin = params.origin || "";
  const destination = params.destination || "";
  const date = params.date || "";
  const passengers = Number(params.passengers || 1);

  const originAirport = BANGLADESH_AIRPORTS.find(
    (airport) => airport.code === origin,
  );
  const destAirport = BANGLADESH_AIRPORTS.find(
    (airport) => airport.code === destination,
  );

  const searchInfo = `${originAirport?.city || origin} → ${destAirport?.city || destination} on ${date} • ${passengers} passenger${passengers > 1 ? "s" : ""}`;

  return (
    <div className="  font-sans">
      <SearchInfoBar searchInfo={searchInfo} />
      <FlightsClient />
    </div>
  );
}
