import { FlightsClient } from "@/components/flights/FlightsClient";
import { SearchInfoBar } from "@/components/flights/SearchInfoBar";
import { BANGLADESH_AIRPORTS } from "@/lib/airports";

interface FlightsPageProps {
  searchParams: Promise<{
    origin?: string;
    destination?: string;
    date?: string;
    passengers?: string;
  }>;
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
    <div className=" bg-gray-50 font-sans">
      <SearchInfoBar searchInfo={searchInfo} />
      <FlightsClient />
    </div>
  );
}
