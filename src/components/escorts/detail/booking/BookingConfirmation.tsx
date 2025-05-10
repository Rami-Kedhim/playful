
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CalendarDays, Clock, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookingFormValues } from '../../../escorts/booking/types';
import { Escort } from '@/types/Escort';
import { format } from 'date-fns';

interface BookingConfirmationProps {
  escort: Escort;
  bookingDate?: Date;
  bookingTime?: string;
  duration?: string;
  location?: string;
  onClose: () => void;
  status?: string;
  // Allow formData as an alternative way to provide booking details
  formData?: BookingFormValues;
}

const BookingConfirmation = ({ 
  escort, 
  bookingDate, 
  bookingTime, 
  duration, 
  location,
  formData,
  status = 'pending',
  onClose 
}: BookingConfirmationProps) => {
  // Use either direct props or extract from formData if provided
  const date = bookingDate || formData?.date;
  const time = bookingTime || formData?.time;
  const durationValue = duration || formData?.duration;
  const locationValue = location || 'Location to be confirmed';
  
  const formattedDate = date ? format(date, 'EEEE, MMMM d, yyyy') : 'Date to be confirmed';

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Booking Confirmation</DialogTitle>
          <DialogDescription>
            Please review your booking details below.
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>
              You have successfully booked {escort.name}.
              {status && <span className="ml-2 text-primary">{status}</span>}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium leading-none">Date</p>
                <p className="text-sm text-muted-foreground">
                  {formattedDate}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium leading-none">Time</p>
                <p className="text-sm text-muted-foreground">
                  {time || 'Time to be confirmed'} ({durationValue || 'Duration to be confirmed'})
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium leading-none">Location</p>
                <p className="text-sm text-muted-foreground">{locationValue}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => onClose()}>
              <Check className="mr-2 h-4 w-4" />
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmation;
