import type { Flight } from "@/lib/types";
import { formatDuration, getAirlineInitials, getAirlineAvatarStyles } from "@/lib/utils";
import { RiCalendarLine, RiSuitcaseLine, RiShieldCheckLine, RiPlaneLine } from "react-icons/ri";

interface FlightSummaryProps {
  flight: Flight;
  showPricePerPerson?: boolean;
  passengerCount?: number;
}

export function FlightSummary({
  flight,
  showPricePerPerson = false,
  passengerCount = 1,
}: FlightSummaryProps) {
  const formattedDate = flight.date
    ? new Date(flight.date).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    : "";

  return (
    <div className="space-y-3">
      {/* Top row: Airline & Badge metadata */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${getAirlineAvatarStyles(flight.airline)}`}>
            {getAirlineInitials(flight.airline)}
          </div>
          <div className="text-left">
            <span className="font-bold text-gray-900">{flight.airline}</span>
            <span className="ml-2 text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full font-medium">
              {flight.flightNumber}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {flight.refundable ? (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <RiShieldCheckLine size={13} /> Refundable
            </span>
          ) : (
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <RiShieldCheckLine size={13} /> Non-Refundable
            </span>
          )}
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${flight.classType === "Business"
            ? "text-purple-700 bg-purple-50 border-purple-200"
            : "text-indigo-700 bg-indigo-50 border-indigo-200"
            }`}>
            {flight.classType} Class
          </span>
        </div>
      </div>

      {/* Middle row: The original clean flight route schedule */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-1">
        <div className="flex-1 flex items-center gap-6">
          {/* Departure details */}
          <div className="w-24 text-left">
            <div className="text-2xl font-extrabold text-gray-900">{flight.departureTime}</div>
            <div className="text-sm font-bold text-gray-700 mt-0.5">{flight.origin}</div>
          </div>

          {/* Connection timeline */}
          <div className="flex-1 flex flex-col items-center">
            <div className="text-xs font-medium text-muted-foreground">
              {formatDuration(flight.durationMinutes)}
            </div>
            <div className="w-full h-px bg-gray-200 relative mt-2">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary border-2 border-white ring-2 ring-primary/10 rounded-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary border-2 border-white ring-2 ring-primary/10 rounded-full" />
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 text-primary text-xs">
                <RiPlaneLine size={16} className="rotate-90" />
              </div>
            </div>
            <div className="text-[11px] font-bold text-gray-500 mt-3 uppercase tracking-wider">
              {flight.stops === 0
                ? "Non-stop"
                : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
            </div>
          </div>

          {/* Arrival details */}
          <div className="w-24 text-right">
            <div className="text-2xl font-extrabold text-gray-900">{flight.arrivalTime}</div>
            <div className="text-sm font-bold text-gray-700 mt-0.5">{flight.destination}</div>
          </div>
        </div>

        {/* Pricing details on the right */}
        {showPricePerPerson ? (
          <div className="flex flex-col items-end shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-6">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Price per person</div>
            <div className="text-2xl font-extrabold text-primary mt-0.5">
              ৳{flight.price.toLocaleString()}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-end shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-6 text-right">
            {passengerCount > 1 ? (
              <>
                <div className="text-xs text-muted-foreground font-medium">
                  ৳{flight.price.toLocaleString()} × {passengerCount}
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Total Fare</div>
              </>
            ) : (
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Fare</div>
            )}
            <div className="text-2xl font-extrabold text-primary mt-0.5">
              ৳{(flight.price * passengerCount).toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Bottom row: Extra helper metadata (Baggage & Date) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100 text-xs text-gray-600">
        <div className="flex items-center gap-1.5 font-medium">
          <RiCalendarLine className="text-gray-400" size={15} />
          <span>Flight Date: <strong className="text-gray-900">{formattedDate}</strong></span>
        </div>
        <div className="flex items-center gap-3 font-medium">
          <span className="flex items-center gap-1">
            <RiSuitcaseLine className="text-gray-400" size={15} />
            Cabin: <strong className="text-gray-900">{flight.cabinBaggage}</strong>
          </span>
          <span className="flex items-center gap-1">
            <RiSuitcaseLine className="text-gray-400" size={15} />
            Check-in: <strong className="text-gray-900">{flight.checkedBaggage}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
