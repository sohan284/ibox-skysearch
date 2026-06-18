"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
}

export function AirportCombobox({
  value,
  onChange,
  placeholder = "Select airport...",
  label,
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

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedAirport ? (
              <span>
                {selectedAirport.code} - {selectedAirport.city}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search airport..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandEmpty>No airport found.</CommandEmpty>
            <CommandGroup>
              {filteredAirports.map((airport) => (
                <CommandItem
                  key={airport.code}
                  value={airport.code}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === airport.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{airport.code}</span>
                    <span className="text-sm text-muted-foreground">
                      {airport.name}
                    </span>
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
