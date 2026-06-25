import { useState, useEffect } from "react";
import { getFlights } from "@/lib/api/flights";
import type { Flight } from "@/lib/types";

export function useFlights(origin?: string, destination?: string, date?: string) {
  const [data, setData] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFlights() {
      setIsLoading(true);
      setError(null);
      try {
        const flights = await getFlights({ origin, destination, date });
        setData(flights);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch flights"));
      } finally {
        setIsLoading(false);
      }
    }
    fetchFlights();
  }, [origin, destination, date]);

  return { data, isLoading, error };
}
