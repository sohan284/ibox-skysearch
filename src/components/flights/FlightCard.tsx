import { CustomButton } from "@/components/ui/CustomButton";
import { Card, CardContent } from "@/components/ui/card";
import type { Flight } from "@/lib/types";
import { FlightSummary } from "./FlightSummary";

interface FlightCardProps {
  flight: Flight;
  onSelect: () => void;
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  return (
    <Card className=" transition-all duration-300 border-2 border-gray-100 hover:border-primary/30">
      <CardContent className="p-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex-1">
            <FlightSummary flight={flight} showPricePerPerson={true} />
          </div>
          <div className="flex flex-col items-end gap-4">
            <CustomButton onClick={onSelect} variant="gradient">
              Select Flight
            </CustomButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
