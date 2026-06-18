"use client";

import { useRouter } from "next/navigation";
import { useState, lazy, Suspense } from "react";
const SearchForm = lazy(() => import("@/components/flights/SearchForm"));

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

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#007eff]"
        >
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6.5 21 5 20 4s-2.5 1-3.5 2L13 8l-8.2-1.8c-.7-.1-1.4.4-1.4 1.1 0 .5.3 1 .7 1.3L8 11l-1.7 4.9c-.2.6 0 1.3.5 1.7l1.7 1.7c.4.4 1.1.6 1.7.5L13 16l2.5 2.5c.3.4.8.7 1.3.7.1 0 .3 0 .4-.1.7-.3 1.2-1 .9-1.6z" />
        </svg>
      ),
      title: "Fast Search",
      description: "Find flights in seconds with our powerful search engine",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#007eff]"
        >
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.77 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.77-4.78 4 4 0 0 1 0-6.75" />
          <path d="M12 10v4" />
          <path d="M12 16h.01" />
        </svg>
      ),
      title: "Best Prices",
      description: "Compare prices and find the best deals available",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#007eff]"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: "Easy Booking",
      description: "Simple and secure booking process in just a few clicks",
    },
  ];

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-12">
        <Suspense
          fallback={
            <div className="text-center py-12">Loading search form...</div>
          }
        >
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </Suspense>
      </main>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Why Choose iBox SkySearch?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-black">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
