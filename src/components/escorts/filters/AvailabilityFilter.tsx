
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AvailabilityFilterProps {
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
  availableNow: boolean;
  setAvailableNow: (available: boolean) => void;
  selectedDays?: string[];
  toggleDay?: (day: string) => void;
  selectedHours?: string[];
  toggleHour?: (hour: string) => void;
}

const AvailabilityFilter = ({
  verifiedOnly,
  setVerifiedOnly,
  availableNow,
  setAvailableNow,
  selectedDays = [],
  toggleDay,
  selectedHours = [],
  toggleHour
}: AvailabilityFilterProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const hours = ["morning", "afternoon", "evening", "night"];
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Availability</h3>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="verified-only" 
            checked={verifiedOnly}
            onCheckedChange={() => setVerifiedOnly(!verifiedOnly)}
          />
          <Label 
            htmlFor="verified-only" 
            className="text-sm cursor-pointer"
          >
            Verified profiles only
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="available-now" 
            checked={availableNow}
            onCheckedChange={() => setAvailableNow(!availableNow)}
          />
          <Label 
            htmlFor="available-now"
            className="text-sm cursor-pointer"
          >
            Available now
          </Label>
        </div>
      </div>
      
      {toggleDay && toggleHour && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs flex items-center justify-center w-full"
          >
            {showAdvanced ? (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                Hide advanced filters
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                Show advanced filters
              </>
            )}
          </Button>
          
          {showAdvanced && (
            <div className="pt-2 space-y-4">
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Days</h4>
                <div className="grid grid-cols-2 gap-2">
                  {days.map(day => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`day-${day}`} 
                        checked={selectedDays.includes(day)}
                        onCheckedChange={() => toggleDay(day)}
                      />
                      <Label 
                        htmlFor={`day-${day}`}
                        className="text-xs capitalize cursor-pointer"
                      >
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Hours</h4>
                <div className="grid grid-cols-2 gap-2">
                  {hours.map(hour => (
                    <div key={hour} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`hour-${hour}`} 
                        checked={selectedHours.includes(hour)}
                        onCheckedChange={() => toggleHour(hour)}
                      />
                      <Label 
                        htmlFor={`hour-${hour}`}
                        className="text-xs capitalize cursor-pointer"
                      >
                        {hour}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailabilityFilter;
