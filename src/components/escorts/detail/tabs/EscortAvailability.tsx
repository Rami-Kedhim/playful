
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { EscortAvailabilityDay } from '@/types/escort';

interface EscortAvailabilityProps {
  availability: string[] | EscortAvailabilityDay[] | undefined;
  showFullSchedule?: boolean;
}

const EscortAvailability: React.FC<EscortAvailabilityProps> = ({ 
  availability,
  showFullSchedule = true
}) => {
  if (!availability || (Array.isArray(availability) && availability.length === 0)) {
    return (
      <div className="text-muted-foreground text-sm italic">
        No availability information provided
      </div>
    );
  }

  // Handle the case when availability is just a string array of days
  if (Array.isArray(availability) && typeof availability[0] === 'string') {
    // Convert string[] to EscortAvailabilityDay[]
    const availabilityDays = (availability as string[]).map(day => ({
      day,
      available: true
    }));
    
    return (
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {availabilityDays.map((day, index) => (
            <Badge key={index} variant="outline" className="px-3 py-1">
              {day.day}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  // Handle the case when availability is an array of EscortAvailabilityDay objects
  const availableDays = availability as EscortAvailabilityDay[];
  
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {availableDays.map((day, index) => (
          <Badge 
            key={index} 
            variant={day.available ? "default" : "outline"}
            className={`px-3 py-1 ${!day.available ? 'text-muted-foreground' : ''}`}
          >
            {day.day}
          </Badge>
        ))}
      </div>
      
      {showFullSchedule && (
        <div className="space-y-4 mt-6">
          {availableDays
            .filter(day => day.available && day.hours && day.hours.length > 0)
            .map((day, index) => (
              <div key={index} className="flex flex-col">
                <h4 className="text-sm font-medium mb-1">{day.day}</h4>
                <div className="space-y-1">
                  {day.hours?.map((hour, hourIndex) => (
                    <div key={hourIndex} className="text-sm text-muted-foreground">
                      {hour.start} - {hour.end}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default EscortAvailability;
