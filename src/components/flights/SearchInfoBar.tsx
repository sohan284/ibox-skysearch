"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import FlightSearchBox from "@/components/home/FlightSearchBox";

interface SearchInfoBarProps {
  searchInfo: string;
}

export function SearchInfoBar({ searchInfo }: SearchInfoBarProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 py-3 max-w-6xl mx-auto flex items-center justify-between gap-4">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
        >
          <RiArrowLeftLine size={18} />
          <span className="text-sm">Back</span>
        </button>
        <div className="text-sm font-medium text-gray-800 flex-1 text-center">
          {searchInfo}
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-primary text-sm hover:underline font-medium flex items-center gap-1"
        >
          <span>Edit Search</span>
          {isEditing ? <RiArrowUpSLine size={16} /> : <RiArrowDownSLine size={16} />}
        </button>
      </div>

      {/* Absolutely positioned smooth dropdown */}
      <div
        className={`absolute left-0 right-0 top-full bg-white border border-t-0 rounded-b-xl z-50 transition-all duration-300 ease-in-out origin-top ${isEditing
          ? "opacity-100 translate-y-0 scale-y-100 pointer-events-auto"
          : "opacity-0 -translate-y-2 scale-y-95 pointer-events-none"
          }`}
      >
        <div className="max-w-4xl mx-auto p-5">
          <FlightSearchBox isModify={true} onSearchComplete={() => setIsEditing(false)} />
        </div>
      </div>
    </div>
  );
}
