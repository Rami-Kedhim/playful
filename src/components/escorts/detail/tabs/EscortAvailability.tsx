
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EscortAvailability } from '@/types/Escort';

interface EscortAvailabilityProps {
  availability?: EscortAvailability;
}

const EscortAvailabilityDisplay: React.FC<EscortAvailabilityProps> = ({ availability }) => {
  if (!availability) {
    return <p className="text-muted-foreground">No availability information provided</p>;
  }

  return (
    <div className="space-y-4">
      {availability.isAvailableNow && (
        <div className="mb-4">
          <Badge variant="success" className="text-sm">Available Now</Badge>
        </div>
      )}
      
      {availability.days && availability.days.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availability.days.map((dayInfo, index) => (
            <Card key={index} className={`border ${dayInfo.available ? 'border-green-200' : 'border-gray-200'}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{dayInfo.day}</h3>
                  <Badge variant={dayInfo.available ? "success" : "outline"}>
                    {dayInfo.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
                
                {dayInfo.available && dayInfo.hours && dayInfo.hours.length > 0 && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    {dayInfo.hours.map((timeSlot, idx) => (
                      <div key={idx} className="mt-1">
                        {timeSlot.start} - {timeSlot.end}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {availability.notes && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Notes</h3>
          <p className="text-muted-foreground">{availability.notes}</p>
        </div>
      )}
    </div>
  );
};

const EscortAvailability: React.FC<{ escort: { availability?: EscortAvailability } }> = ({ escort }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <EscortAvailabilityDisplay availability={escort.availability} />
      </CardContent>
    </Card>
  );
};

export default EscortAvailability;
