"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchForm } from "@/components/flights/SearchForm";

export function HomeClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (searchParams: {
    origin: string;
    destination: string;
    date: string;
    passengers: number;
  }) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const params = new URLSearchParams({
        origin: searchParams.origin,
        destination: searchParams.destination,
        date: searchParams.date,
        passengers: searchParams.passengers.toString(),
      });
      router.push(`/flights?${params.toString()}`);
    }, 1000);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />
    </main>
  );
}
