
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Escort } from "@/types/Escort";
import type { EscortAvailability as EscortAvailabilityType } from "@/types/Escort";
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
  
  const availability = escort.availability as EscortAvailabilityType;
  
  if (availability.days && Array.isArray(availability.days)) {
    availabilityDays = availability.days;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {availabilityDays.length > 0 ? (
            availabilityDays.map((dayInfo) => (
              <div
                key={dayInfo.day}
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

        {availability.notes && (
          <div className="mt-4 text-sm text-muted-foreground">
            <h4 className="font-medium text-foreground mb-1">Notes:</h4>
            <p>{availability.notes}</p>
          </div>
        )}

        {/* Add availability notes from escort if they exist */}
      </CardContent>
    </Card>
  );
};

export default EscortAvailability;
