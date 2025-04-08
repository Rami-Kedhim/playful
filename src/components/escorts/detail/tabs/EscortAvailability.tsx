
import React from 'react';
import { Card } from '@/components/ui/card';
import { Escort } from '@/types/escort';
import { Calendar, Clock } from 'lucide-react';

interface EscortAvailabilityProps {
  escort: Escort;
}

const EscortAvailability: React.FC<EscortAvailabilityProps> = ({ escort }) => {
  const { availability } = escort;
  
  // Format days for display
  const formatDays = (days: string[]): string => {
    return days.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ');
  };
  
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Availability Schedule</h3>
      
      <div className="space-y-6">
        {availability ? (
          <>
            <div className="flex items-start gap-4">
              <Calendar className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium">Available Days</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {formatDays(availability.days)}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Clock className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium">Hours</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {availability.hours}
                </p>
              </div>
            </div>
            
            {availability.exceptions && availability.exceptions.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-2">Special Dates</h4>
                <ul className="space-y-2">
                  {availability.exceptions.map((exception, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{exception.date}</span>
                      <span>{exception.available ? (exception.customHours || availability.hours) : 'Not available'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-600">No availability information provided.</p>
        )}
        
        {escort.availableNow && (
          <div className="mt-6 py-2 px-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md inline-block">
            <span className="font-semibold">Available Now</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EscortAvailability;
