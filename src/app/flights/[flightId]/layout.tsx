import React from "react";

export default function FlightDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto py-6">
      {children}
    </div>
  );
}
