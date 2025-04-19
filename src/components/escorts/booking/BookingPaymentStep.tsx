import React from 'react';
import { Escort, Booking } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Check, Clock, DollarSign, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface BookingPaymentStepProps {
  escort: Escort;
  booking: Partial<Booking>;
  onBack: () => void;
  onComplete: () => void;
  isSubmitting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({
  escort,
  booking,
  onBack,
  onComplete,
  isSubmitting,
  onConfirm,
  onCancel,
}) => {
  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
  };

  const formatTime = (timeString: string | undefined) => {
    if (!timeString) return 'N/A';
    return timeString;
  };

  const formatDuration = (duration: number | undefined) => {
    if (!duration) return 'N/A';
    if (duration === 60) return '1 hour';
    if (duration === 120) return '2 hours';
    if (duration === 180) return '3 hours';
    if (duration === 240) return '4 hours';
    if (duration > 240) return 'Overnight';
    return `${duration} minutes`;
  };

  const calculateTotal = () => {
    const basePrice = booking.price || 0;
    const serviceFee = Math.round(basePrice * 0.05);
    return basePrice + serviceFee;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Booking Confirmation</CardTitle>
        <CardDescription>
          Review your booking details before confirming
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={escort.profileImage || escort.imageUrl || escort.avatar} />
            <AvatarFallback>{escort.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{escort.name}</h3>
            {escort.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{escort.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 bg-muted/30 p-4 rounded-md">
          <div className="flex justify-between">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Date</span>
            </div>
            <span className="text-sm font-medium">{formatDate(booking.date)}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Time</span>
            </div>
            <span className="text-sm font-medium">{formatTime(booking.startTime)}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Duration</span>
            </div>
            <span className="text-sm font-medium">{formatDuration(booking.duration)}</span>
          </div>
          {booking.service && (
            <div className="flex justify-between">
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Service</span>
              </div>
              <span className="text-sm font-medium capitalize">{booking.service}</span>
            </div>
          )}
          {booking.location && (
            <div className="flex justify-between">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Location</span>
              </div>
              <span className="text-sm font-medium">{booking.location}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Base price</span>
            <span className="text-sm font-medium">${booking.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Service fee</span>
            <span className="text-sm font-medium">${Math.round((booking.price || 0) * 0.05)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md text-sm text-amber-800 dark:text-amber-300">
          <p className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              A deposit of ${Math.round(calculateTotal() * 0.2)} will be charged now to secure your booking.
            </span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          className="w-full" 
          onClick={onConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Processing..." : "Confirm & Pay"}
        </Button>
        <div className="flex justify-between w-full">
          <Button 
            variant="outline" 
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button 
            variant="ghost" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookingPaymentStep;
