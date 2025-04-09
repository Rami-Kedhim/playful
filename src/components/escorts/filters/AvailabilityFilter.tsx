
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface AvailabilityFilterProps {
  availableNow: boolean;
  setAvailableNow: (available: boolean) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
  selectedDays?: string[];
  toggleDay?: (day: string) => void;
  selectedHours?: string[];
  toggleHour?: (hour: string) => void;
}

const AvailabilityFilter = ({
  availableNow,
  setAvailableNow,
  verifiedOnly,
  setVerifiedOnly,
  selectedDays = [],
  toggleDay = () => {},
  selectedHours = [],
  toggleHour = () => {}
}: AvailabilityFilterProps) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = ["Morning", "Afternoon", "Evening", "Late Night"];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="available-now" className="text-sm font-normal">Available Now</Label>
          <Switch 
            id="available-now" 
            checked={availableNow}
            onCheckedChange={setAvailableNow}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="verified-only" className="text-sm font-normal">Verified Only</Label>
          <Switch 
            id="verified-only" 
            checked={verifiedOnly}
            onCheckedChange={setVerifiedOnly}
          />
        </div>
      </div>

      {/* Days availability */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Available Days</Label>
        <div className="grid grid-cols-2 gap-2">
          {daysOfWeek.map(day => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox 
                id={`day-${day.toLowerCase()}`}
                checked={selectedDays.includes(day)} 
                onCheckedChange={() => toggleDay(day)}
              />
              <Label htmlFor={`day-${day.toLowerCase()}`} className="text-sm font-normal">{day}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Hours availability */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Available Hours</Label>
        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map(slot => (
            <div key={slot} className="flex items-center space-x-2">
              <Checkbox 
                id={`time-${slot.toLowerCase().replace(' ', '-')}`}
                checked={selectedHours.includes(slot)} 
                onCheckedChange={() => toggleHour(slot)}
              />
              <Label htmlFor={`time-${slot.toLowerCase().replace(' ', '-')}`} className="text-sm font-normal">{slot}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityFilter;
