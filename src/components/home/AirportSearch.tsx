"use client";

import React, { useState, useRef, useEffect } from "react";
import { BANGLADESH_AIRPORTS, type Airport } from "@/lib/airports";
import { RiMapPin2Line } from "react-icons/ri";

interface AirportSearchProps {
  label: string;
  value: Airport | null;
  onChange: (airport: Airport) => void;
}

const AirportSearch: React.FC<AirportSearchProps> = ({
  label,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredAirports = BANGLADESH_AIRPORTS.filter(
    (airport) =>
      airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-gray-600 font-medium mb-1 text-center">
        {label}
      </label>
      <h1 className="text-center text-[40px] text-primary mt-1 mb-2">
        {value?.code || "---"}
      </h1>
      <div
        className="bg-[#d7e7f4] rounded flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <>
          <span className="bg-primary text-white font-bold p-2 rounded-l">
            <RiMapPin2Line size={20} />
          </span>
          <span className="text-gray-800 py-1 px-2 text-sm font-medium text-nowrap overflow-hidden text-ellipsis">
            {value ? `${value.name} (${value.code})` : "Select Airport"}
          </span>
        </>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-primary shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          <div className="p-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white placeholder-primary text-primary text-[14px]"
              placeholder="Search a airport..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="py-1 bg-primary">
            {filteredAirports.map((airport) => (
              <div
                key={airport.code}
                className="px-4 py-2 hover:bg-[#525371] cursor-pointer"
                onClick={() => {
                  onChange(airport);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-zinc-200">
                      {airport.name}
                    </div>
                    <div className="text-xs text-white">
                      {airport.city}, {airport.country}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AirportSearch;
