// Update import to use consistent casing
import { Escort } from '@/types/Escort';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CalendarDays, Clock, MapPin } from 'lucide-react';

interface BookingConfirmationProps {
  escort: Escort;
  bookingDate: Date;
  bookingTime: string;
  duration: string;
  location: string;
  onClose: () => void;
}

const BookingConfirmation = ({ 
  escort, 
  bookingDate, 
  bookingTime, 
  duration, 
  location, 
  onClose 
}: BookingConfirmationProps) => {
  const formattedDate = bookingDate.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
                  {bookingTime} ({duration})
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium leading-none">Location</p>
                <p className="text-sm text-muted-foreground">{location}</p>
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
