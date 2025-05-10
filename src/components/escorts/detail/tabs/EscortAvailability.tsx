
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Escort, EscortAvailability as EscortAvailabilityType } from "@/types/Escort";
import { Calendar, Clock } from "lucide-react";

interface EscortAvailabilityProps {
  escort: Escort;
}

const EscortAvailability: React.FC<EscortAvailabilityProps> = ({ escort }) => {
  if (!escort.availability) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">
            No availability information provided.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Get availability days from the escort availability
  let availabilityDays: { day: string; available: boolean; hours?: { start: string; end: string }[] }[] = [];
  
  if (typeof escort.availability === 'object' && !Array.isArray(escort.availability)) {
    // It's an EscortAvailability object
    const availability = escort.availability as EscortAvailabilityType;
    
    if (availability.days && Array.isArray(availability.days)) {
      availabilityDays = availability.days;
    } else {
      // Create availability days from individual day properties if available
      const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      availabilityDays = daysOfWeek
        .filter(day => availability[day as keyof EscortAvailabilityType])
        .map(day => ({
          day: day.charAt(0).toUpperCase() + day.slice(1),
          available: Array.isArray(availability[day as keyof EscortAvailabilityType]) && 
                    (availability[day as keyof EscortAvailabilityType] as string[]).length > 0
        }));
    }
  } else if (Array.isArray(escort.availability)) {
    // It's an array of available days
    availabilityDays = escort.availability.map(day => ({
      day,
      available: true
    }));
  } else if (typeof escort.availability === 'string') {
    // It's a string description of availability
    availabilityDays = [
      {
        day: 'Availability',
        available: true,
        hours: [{ start: 'See', end: 'description' }]
      }
    ];
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {availabilityDays.length > 0 ? (
            availabilityDays.map((dayInfo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">{dayInfo.day}</span>
                </div>

                {dayInfo.available ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {dayInfo.hours && dayInfo.hours.length > 0 ? (
                      dayInfo.hours.map((hour, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {hour.start} - {hour.end}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Available
                      </Badge>
                    )}
                  </div>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 text-gray-500">
                    Not Available
                  </Badge>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              Schedule not provided. Contact for availability.
            </p>
          )}
        </div>

        {typeof escort.availability === 'object' && 
          !Array.isArray(escort.availability) &&
          (escort.availability as EscortAvailabilityType).notes && (
          <div className="mt-4 text-sm text-muted-foreground">
            <h4 className="font-medium text-foreground mb-1">Notes:</h4>
            <p>{(escort.availability as EscortAvailabilityType).notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EscortAvailability;
