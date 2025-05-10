
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Escort, EscortAvailabilityDay } from '@/types/escort';
import { Calendar, Clock } from 'lucide-react';

interface EscortAvailabilityProps {
  escort: Escort;
}

// Helper function to convert various availability formats to days array
const formatAvailability = (availability?: string | string[] | { days: string[] | EscortAvailabilityDay[] }): EscortAvailabilityDay[] => {
  if (!availability) {
    return [];
  }
  
  // Handle string format
  if (typeof availability === 'string') {
    return [{ day: 'General', available: true, hours: [{ start: availability, end: '' }] }];
  }
  
  // Handle string[] format
  if (Array.isArray(availability)) {
    if (typeof availability[0] === 'string') {
      return (availability as string[]).map(day => ({
        day,
        available: true
      }));
    }
    // It's already EscortAvailabilityDay[]
    return availability as EscortAvailabilityDay[];
  }
  
  // Handle object format with days
  if ('days' in availability) {
    const days = availability.days;
    
    if (Array.isArray(days)) {
      if (typeof days[0] === 'string') {
        return (days as string[]).map(day => ({
          day,
          available: true
        }));
      }
      // It's already EscortAvailabilityDay[]
      return days as EscortAvailabilityDay[];
    }
  }
  
  return [];
};

const EscortAvailability: React.FC<EscortAvailabilityProps> = ({ escort }) => {
  const availabilityDays = React.useMemo(() => {
    if (!escort.availability) {
      return [{ day: 'Flexible', available: true }];
    }
    
    return formatAvailability(escort.availability);
  }, [escort.availability]);
  
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5" />
          Availability
        </h3>
        
        <div className="space-y-4">
          {availabilityDays.map((day, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2">
              <div className="font-medium">{day.day}</div>
              <div className="flex items-center gap-1 text-sm">
                {day.hours && day.hours.length > 0 ? (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>
                      {day.hours.map(h => `${h.start}${h.end ? ' - ' + h.end : ''}`).join(', ')}
                    </span>
                  </div>
                ) : (
                  <span className={day.available ? 'text-green-500' : 'text-red-500'}>
                    {day.available ? 'Available' : 'Unavailable'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EscortAvailability;
