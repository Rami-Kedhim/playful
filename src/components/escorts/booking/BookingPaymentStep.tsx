
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Escort } from '@/types/escort';
import { Booking } from '@/types/booking';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCurrency } from '@/utils/formatters';

interface BookingPaymentStepProps {
  escort: Escort;
  booking: Partial<Booking>;
  onBack: () => void;
  onComplete: () => void;
  isSubmitting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({
  escort,
  booking,
  onBack,
  isSubmitting = false,
  onConfirm,
  onCancel
}) => {
  // Calculate the price based on the duration selected
  const calculatePrice = () => {
    // Handle cases where height might not be the right type
    if (escort.height !== undefined && typeof escort.height !== 'string') {
      escort = {
        ...escort,
        height: String(escort.height)
      };
    }
    
    // Safely get the price from rates if available
    const getRate = () => {
      if (escort.rates) {
        if (booking.duration === '1 hour') return escort.rates.hourly || escort.price;
        if (booking.duration === '2 hours') return escort.rates.twoHours || (escort.price * 1.8);
        if (booking.duration === '3 hours') return escort.price * 2.5;
        if (booking.duration === 'Overnight') return escort.rates.overnight || (escort.price * 5);
      }
      return escort.price;
    };

    return getRate();
  };

  const price = calculatePrice();
  const commission = Math.round(price * 0.15); // Example commission calculation
  const total = price + commission;

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Confirm Your Booking</DialogTitle>
          <DialogDescription>
            Please review your booking details and confirm payment to proceed.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Escort info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={escort.imageUrl || escort.profileImage} />
              <AvatarFallback>{escort.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{escort.name}</h3>
              <p className="text-sm text-muted-foreground">{escort.location}</p>
            </div>
          </div>

          {/* Booking details */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {booking.date ? format(new Date(booking.date), 'PPP') : 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{booking.time || 'Not specified'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{booking.duration || '1 hour'}</p>
              </div>

              <Separator />

              {/* Price breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Base Rate</p>
                  <p>{formatCurrency(price)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Platform Fee</p>
                  <p>{formatCurrency(commission)}</p>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <p>Total</p>
                  <p>{formatCurrency(total)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-2">
              By confirming, you agree to our terms of service and privacy policy.
              Payment will be processed securely upon confirmation from the escort.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
              Back
            </Button>
            <Button onClick={onConfirm} disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingPaymentStep;
