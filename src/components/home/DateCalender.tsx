"use client";

import { useState } from "react";
import { SlCalender } from "react-icons/sl";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateCalenderProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  minDate?: Date | null;
}

export default function DateCalender({
  selectedDate,
  setSelectedDate,
  minDate,
}: DateCalenderProps) {
  const [open, setOpen] = useState(false);
  const today = new Date();

  const disabledDates = (date: Date) => {
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const compareToday = new Date(today);
    compareToday.setHours(0, 0, 0, 0);

    const maxDate = new Date(compareToday);
    maxDate.setDate(maxDate.getDate() + 4); // Only allow next 5 days (today + 4)

    if (minDate) {
      const compareMinDate = new Date(minDate);
      compareMinDate.setHours(0, 0, 0, 0);
      return compareDate < compareMinDate || compareDate > maxDate;
    }
    return compareDate < compareToday || compareDate > maxDate;
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "Select date";
    return format(date, "d MMM yy");
  };

  return (
    <div className="relative text-gray-800">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className="rounded flex items-center cursor-pointer bg-[#d7e7f4]"
            onClick={() => setOpen(!open)}
          >
            <div className="bg-primary p-2 rounded-l flex items-center mr-2">
              <SlCalender size={20} className="text-white" />
            </div>
            <span
              className={`${selectedDate ? "text-gray-800" : "text-gray-400"}`}
            >
              {formatDate(selectedDate)}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                setOpen(false);
              }
            }}
            disabled={disabledDates}
            defaultMonth={today}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
