
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Clock, Shield } from "lucide-react";

interface AvailabilityFilterProps {
  availableNow: boolean;
  setAvailableNow: (value: boolean) => void;
  verifiedOnly?: boolean;
  setVerifiedOnly?: (value: boolean) => void;
}

const AvailabilityFilter = ({ 
  availableNow, 
  setAvailableNow, 
  verifiedOnly = false, 
  setVerifiedOnly 
}: AvailabilityFilterProps) => {
  return (
    <div className="space-y-4">
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
      
      {setVerifiedOnly && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="verified-only" className="text-sm font-medium cursor-pointer">
              Verified Only
            </Label>
          </div>
          <Switch
            id="verified-only"
            checked={verifiedOnly}
            onCheckedChange={setVerifiedOnly}
          />
        </div>
      )}
    </div>
  );
};

export default AvailabilityFilter;
