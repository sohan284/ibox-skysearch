"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlaneTakeoff, PlaneLanding } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BANGLADESH_AIRPORTS, type Airport } from "@/lib/airports";

interface AirportComboboxProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  type?: "departure" | "arrival";
}

export function AirportCombobox({
  value,
  onChange,
  placeholder = "Select airport...",
  label,
  type = "departure",
}: AirportComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const selectedAirport = BANGLADESH_AIRPORTS.find(
    (airport) => airport.code === value
  );

  // Filter airports based on search term
  const filteredAirports = React.useMemo(() => {
    if (!search) {
      // Show first 5 when no search term
      return BANGLADESH_AIRPORTS.slice(0, 5);
    }

    return BANGLADESH_AIRPORTS.filter(
      (airport) =>
        airport.code.toLowerCase().includes(search.toLowerCase()) ||
        airport.name.toLowerCase().includes(search.toLowerCase()) ||
        airport.city.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const Icon = type === "departure" ? PlaneTakeoff : PlaneLanding;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#007eff]" />
        <label className="text-sm font-medium text-black">{label}</label>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-2 border-gray-200 hover:border-[#007eff] hover:text-[#007eff] transition-all duration-300"
          >
            {selectedAirport ? (
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold text-black">{selectedAirport.code} - {selectedAirport.city}</span>
                <span className="text-xs text-muted-foreground">{selectedAirport.name}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 text-[#007eff]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search airport..."
              value={search}
              onValueChange={setSearch}
              className="border-b-2 border-gray-100"
            />
            <CommandEmpty>No airport found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-y-auto">
              {filteredAirports.map((airport) => (
                <CommandItem
                  key={airport.code}
                  value={airport.code}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="hover:bg-[#007eff]/10 hover:text-[#007eff] transition-all duration-200"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === airport.code ? "opacity-100 text-[#007eff]" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-black">{airport.code} - {airport.city}</span>
                    <span className="text-xs text-muted-foreground">{airport.name}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
