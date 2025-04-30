
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { UberPersona } from '@/types/uberPersona';

interface PersonaBookingTabProps {
  persona: UberPersona;
}

const PersonaBookingTab: React.FC<PersonaBookingTabProps> = ({ persona }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const getMeetingPrice = () => {
    if (persona.monetization && typeof persona.monetization === 'object') {
      return persona.monetization.meetingPrice ?? 0;
    }
    return 0;
  };

  const meetingPrice = getMeetingPrice();

  const availableDates = [
    '2023-08-01', '2023-08-02', '2023-08-03',
    '2023-08-04', '2023-08-05', '2023-08-06'
  ];

  const availableTimes = [
    '10:00 AM', '11:00 AM', '1:00 PM',
    '2:00 PM', '4:00 PM', '7:00 PM'
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Book an Appointment</h3>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="font-medium">
                ${meetingPrice} / hour
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <Calendar className="h-4 w-4 inline mr-2" />
                Select Date
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableDates.map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    onClick={() => setSelectedDate(date)}
                    size="sm"
                    className="w-full"
                  >
                    {new Date(date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Clock className="h-4 w-4 inline mr-2" />
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    size="sm"
                    className="w-full"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              className="w-full mt-6"
              disabled={!selectedDate || !selectedTime}
            >
              Book Now
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-2">
              You won't be charged until your booking is confirmed
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonaBookingTab;
