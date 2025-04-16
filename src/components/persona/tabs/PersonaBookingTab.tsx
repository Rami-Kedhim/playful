
import React, { useState } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, CreditCard } from 'lucide-react';

interface PersonaBookingTabProps {
  persona: UberPersona;
}

const PersonaBookingTab: React.FC<PersonaBookingTabProps> = ({ persona }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  // Default monetization if not present
  const monetization = persona.monetization || {
    acceptsLucoin: true,
    meetingPrice: 150,
    videoChatPrice: 50
  };
  
  // Calculate price
  const calculatePrice = () => {
    if (selectedDuration === null) return monetization.meetingPrice || 150;
    return (selectedDuration * (monetization.meetingPrice || 150));
  };
  
  // Mock available times
  const availableTimes = ['10:00 AM', '1:00 PM', '3:30 PM', '7:00 PM', '9:00 PM'];
  
  // Mock duration options
  const durationOptions = [
    { value: 1, label: '1 hour' },
    { value: 2, label: '2 hours' },
    { value: 3, label: '3 hours' },
    { value: 12, label: 'Overnight (12 hours)' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Book an Appointment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="space-y-4 p-6">
            <h3 className="text-lg font-medium">Select a Date</h3>
            
            {/* Calendar placeholder component */}
            <div className="bg-muted/30 rounded-lg p-4 h-64 flex items-center justify-center border">
              <div className="text-center">
                <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <span className="text-muted-foreground">Calendar Placeholder</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Available Times</h3>
              
              <div className="grid grid-cols-2 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className="justify-start"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Select Duration</h3>
              
              <div className="grid grid-cols-2 gap-2">
                {durationOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedDuration === option.value ? "default" : "outline"}
                    onClick={() => setSelectedDuration(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Appointment Summary</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-muted-foreground">In-call • Downtown Area</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">Date & Time</h4>
                <p className="text-muted-foreground">
                  {selectedDate ? selectedDate.toLocaleDateString() : 'Not selected'} • 
                  {selectedTime ? ` ${selectedTime}` : ' Time not selected'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">Duration</h4>
                <p className="text-muted-foreground">
                  {selectedDuration ? `${selectedDuration} hour${selectedDuration > 1 ? 's' : ''}` : 'Not selected'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">Price</h4>
                <p className="font-semibold text-lg">${calculatePrice()}</p>
                <p className="text-xs text-muted-foreground">50% deposit required to confirm booking</p>
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-6" size="lg">
            Request Booking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonaBookingTab;
