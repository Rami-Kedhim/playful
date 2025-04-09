
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Clock, Shield, Calendar } from "lucide-react";

interface AvailabilityFilterProps {
  availableNow: boolean;
  setAvailableNow: (value: boolean) => void;
  verifiedOnly?: boolean;
  setVerifiedOnly?: (value: boolean) => void;
  selectedDays?: string[];
  toggleDay?: (day: string) => void;
  selectedHours?: string[];
  toggleHour?: (hour: string) => void;
}

const AvailabilityFilter = ({ 
  availableNow, 
  setAvailableNow, 
  verifiedOnly = false, 
  setVerifiedOnly,
  selectedDays = [],
  toggleDay = () => {},
  selectedHours = [],
  toggleHour = () => {}
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

      {/* Day selection could be added here if needed */}
      {selectedDays && selectedDays.length > 0 && toggleDay && (
        <div className="mt-2">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Available Days</Label>
          </div>
          {/* Days selector UI would go here */}
        </div>
      )}
    </div>
  );
};

export default AvailabilityFilter;
