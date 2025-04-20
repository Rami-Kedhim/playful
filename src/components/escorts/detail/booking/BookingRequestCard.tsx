
// Fix import to unify to '@/types/Escort' and normalize height to string

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Escort } from '@/types/Escort'; // unified import
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import BookingDialog from './BookingDialog';

interface BookingRequestCardProps {
  escort: Escort;
  onBookingSubmit: (bookingDetails: any) => Promise<void>;
}

const BookingRequestCard: React.FC<BookingRequestCardProps> = ({
  escort,
  onBookingSubmit,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSubmit = async (bookingDetails: any) => {
    await onBookingSubmit(bookingDetails);
  };

  // Calculate suggested times based on current time
  const getSuggestedTimes = () => {
    const now = new Date();
    const timeSlots = [];
    const startHour = now.getHours() + 1;
    for (let i = 0; i < 3; i++) {
      const hour = (startHour + i * 2) % 24;
      const isPM = hour >= 12;
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      timeSlots.push(`${displayHour}:00 ${isPM ? 'PM' : 'AM'}`);
    }
    return timeSlots;
  };

  const suggestedTimes = getSuggestedTimes();

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const getDayAfterTomorrow = () => {
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return dayAfter;
  };

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  // Normalize height to string to satisfy type
  const normalizedEscort = {
    ...escort,
    height: escort.height !== undefined && typeof escort.height !== 'string'
      ? String(escort.height)
      : escort.height,
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">Book an Appointment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-4">
          <span className="text-sm text-muted-foreground">Hourly Rate</span>
          <div className="text-2xl font-bold">${escort.price || escort.rates?.hourly || 200}</div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Quick Availability</p>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center justify-start gap-2"
              onClick={() => handleDateSelection(getTomorrowDate())}
            >
              <Calendar className="h-4 w-4" />
              <span>Tomorrow</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center justify-start gap-2"
              onClick={() => handleDateSelection(getDayAfterTomorrow())}
            >
              <Calendar className="h-4 w-4" />
              <span>{format(getDayAfterTomorrow(), 'E, MMM d')}</span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Popular Times</p>
          <div className="grid grid-cols-3 gap-2">
            {suggestedTimes.map((time, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex items-center justify-start gap-2"
                onClick={() => setIsDialogOpen(true)}
              >
                <Clock className="h-4 w-4" />
                <span>{time}</span>
              </Button>
            ))}
          </div>
        </div>

        <Button 
          className="w-full"
          onClick={() => setIsDialogOpen(true)}
        >
          Book Now
        </Button>
      </CardContent>

      <BookingDialog
        escort={normalizedEscort}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default BookingRequestCard;

