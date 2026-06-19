"use client";

import { useRouter } from "next/navigation";

interface SearchInfoBarProps {
  searchInfo: string;
}

export function SearchInfoBar({ searchInfo }: SearchInfoBarProps) {
  const router = useRouter();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-[50px] z-40 px-4 py-3 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-sm font-medium text-gray-800">
          {searchInfo}
        </div>
        <button
          onClick={() => router.push("/")}
          className="text-primary text-sm hover:underline font-medium"
        >
          Edit Search
        </button>
      </div>
    </div>
  );
}
