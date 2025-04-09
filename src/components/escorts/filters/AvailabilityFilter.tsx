
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Clock } from "lucide-react";

interface AvailabilityFilterProps {
  availableNow: boolean;
  setAvailableNow: (value: boolean) => void;
}

const AvailabilityFilter = ({ availableNow, setAvailableNow }: AvailabilityFilterProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <Label htmlFor="available-now" className="text-sm font-medium cursor-pointer">
          Available Now
        </Label>
      </div>
      <Switch
        id="available-now"
        checked={availableNow}
        onCheckedChange={setAvailableNow}
      />
    </div>
  );
};

export default AvailabilityFilter;
