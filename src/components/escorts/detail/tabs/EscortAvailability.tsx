import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Escort, Availability } from '@/types/Escort'; // fixed import casing consistent

import { Calendar } from '@/components/ui/calendar';

interface EscortAvailabilityProps {
  escort: Escort;
}

const EscortAvailability: React.FC<EscortAvailabilityProps> = ({ escort }) => {
  // Helper function to safely get availability as string array
  const getAvailabilityDays = (): string[] => {
    if (!escort.availability) return [];
    
    if (Array.isArray(escort.availability)) {
      // If it's already an array, convert items to strings
      return escort.availability.map(item => {
        if (typeof item === 'string') return item;
        return '';
      }).filter(Boolean);
    }
    
    if (typeof escort.availability === 'object') {
      // If it's an object with a day property
      if ('day' in escort.availability && typeof escort.availability.day === 'string') {
        return [escort.availability.day];
      }
      
      // If it has days property
      if ('days' in escort.availability && Array.isArray(escort.availability.days)) {
        return escort.availability.days;
      }
      
      // Otherwise collect day names that are present
      const days = [];
      const availObj = escort.availability as Availability;
      if (availObj.monday) days.push('Monday');
      if (availObj.tuesday) days.push('Tuesday');
      if (availObj.wednesday) days.push('Wednesday');
      if (availObj.thursday) days.push('Thursday');
      if (availObj.friday) days.push('Friday');
      if (availObj.saturday) days.push('Saturday');
      if (availObj.sunday) days.push('Sunday');
      return days;
    }
    
    // If it's a string
    if (typeof escort.availability === 'string') {
      return [escort.availability];
    }
    
    // If it's none of the above, return empty array
    return [];
  };
  
  const availabilityDays = getAvailabilityDays();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Availability</h2>
        <p className="text-muted-foreground">
          Check when {escort.name} is available for bookings.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-4">Calendar View</h3>
            <Calendar
              mode="multiple"
              selected={[]} // You would populate this with actual available dates
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-4">Weekly Schedule</h3>
            <div className="space-y-4">
              {availabilityDays.length > 0 ? (
                availabilityDays.map((day, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded-md hover:bg-accent">
                    <span className="font-medium">{day}</span>
                    <span className="text-sm text-muted-foreground">10:00 AM - 10:00 PM</span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No regular availability has been set. Please contact for specific timing.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EscortAvailability;
