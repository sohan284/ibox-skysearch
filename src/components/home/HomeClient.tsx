"use client";

import FlightSearchBox from "@/components/flights/search/FlightSearchBox";

export function HomeClient() {
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
        <FlightSearchBox />
      </main>
    </>
  );
}
