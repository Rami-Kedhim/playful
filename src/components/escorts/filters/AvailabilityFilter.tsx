
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AvailabilityFilterProps {
  availableNow: boolean;
  setAvailableNow: (value: boolean) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
}

const AvailabilityFilter = ({
  availableNow,
  setAvailableNow,
  verifiedOnly,
  setVerifiedOnly,
}: AvailabilityFilterProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Availability</h3>
      
      <div className="flex items-center space-x-2">
        <Switch 
          checked={availableNow} 
          onCheckedChange={setAvailableNow}
          id="available-now"
        />
        <Label htmlFor="available-now" className="text-sm cursor-pointer">
          Available Now
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          checked={verifiedOnly} 
          onCheckedChange={setVerifiedOnly}
          id="verified-only"
        />
        <Label htmlFor="verified-only" className="text-sm cursor-pointer">
          Verified Escorts Only
        </Label>
      </div>
    </div>
  );
};

export default AvailabilityFilter;
