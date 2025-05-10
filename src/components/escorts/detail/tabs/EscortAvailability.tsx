
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar } from 'lucide-react';
import type { Escort, EscortAvailabilityDay } from '@/types/escort';

interface EscortAvailabilityProps {
  escort: Escort;
}

const EscortAvailability: React.FC<EscortAvailabilityProps> = ({ escort }) => {
  const renderAvailabilityDays = () => {
    if (!escort.availability) {
      return <p>No availability information provided.</p>;
    }

    // Handle string availability
    if (typeof escort.availability === 'string') {
      return <p>{escort.availability}</p>;
    }

    // Handle string array availability
    if (Array.isArray(escort.availability) && typeof escort.availability[0] === 'string') {
      return (
        <div className="grid grid-cols-2 gap-2">
          {(escort.availability as string[]).map((day, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>{day}</span>
            </div>
          ))}
        </div>
      );
    }

    // Handle structured availability (for EscortAvailability object with days property)
    const days = 'days' in escort.availability ? 
      (escort.availability.days || []) : 
      [];
    
    // Handle if days is array of strings
    if (Array.isArray(days) && days.length > 0 && typeof days[0] === 'string') {
      return (
        <div className="grid grid-cols-2 gap-2">
          {(days as string[]).map((day, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>{day}</span>
            </div>
          ))}
        </div>
      );
    }
    
    // Handle if days is array of EscortAvailabilityDay objects
    const availabilityDays: EscortAvailabilityDay[] = days as EscortAvailabilityDay[];
    
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {availabilityDays.map((day, index) => (
          <Card key={index} className={day.available ? "" : "opacity-60"}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{day.day}</CardTitle>
              <CardDescription>
                {day.available ? "Available" : "Not Available"}
              </CardDescription>
            </CardHeader>
            {day.available && day.hours && day.hours.length > 0 && (
              <CardContent>
                <div className="space-y-1">
                  {day.hours.map((hour, hourIndex) => (
                    <div key={hourIndex} className="flex items-center text-sm">
                      <Clock className="h-3 w-3 mr-2" />
                      <span>
                        {hour.start} - {hour.end}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center">
        <Calendar className="h-6 w-6 mr-2" />
        Availability
      </h2>
      {renderAvailabilityDays()}
    </div>
  );
};

export default EscortAvailability;
